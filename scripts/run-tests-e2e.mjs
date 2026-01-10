import { spawn } from 'node:child_process';

/**
 * E2E test runner script.
 *
 * This script starts the API and Web servers, waits for them to be ready,
 * runs the E2E tests, exits with the right code, and cleanup of all processes.
 */
const API_URL = process.env.API_URL ?? 'http://localhost:3001/api/health';
const WEB_URL = process.env.WEB_URL ?? 'http://localhost:5173/';

const apiCmd = ['pnpm', ['-C', 'apps/api', 'dev']];
const webCmd = ['pnpm', ['-C', 'apps/web', 'dev']];
const testsCmd = ['pnpm', ['-C', 'packages/tests-e2e', 'test:e2e']];

function spawnProcess(name, cmd, args) {
  const child = spawn(cmd, args, {
    stdio: 'inherit',
    // Windows needs a shell to run commands (Linux/Mac can run directly)
    shell: process.platform === 'win32',
    env: { ...process.env, FORCE_COLOR: 1 },
  });

  child.on('exit', (code, signal) => {
    if (signal) {
      console.log(`${name} process exited with signal: ${signal}`);
    } else {
      console.log(`${name} process exited with code: ${code}`);
    }
  });

  return child;
}

async function sleep(ms) {
  return new Promise((response) => setTimeout(response, ms));
}

async function waitForUrl(url, child, { timeout_ms = 60_000, interval_ms = 500, name = url } = {}) {
  const start = Date.now();

  while (Date.now() - start < timeout_ms) {
    if (child.exitCode !== null) {
      throw new Error(
        `[❌ exited] [${name}] process exited early with code ${child.exitCode} while waiting for ${url}`,
      );
    }

    try {
      const response = await fetch(url, { method: 'GET' });
      if (response.ok) {
        console.log(`[✅ ready] ${name} is up: ${url}`);
        return;
      }
    } catch (error) {
      // Ignore errors until ready.
    }

    await sleep(interval_ms);
  }

  throw new Error(`[❌ timeout] ${name} timedout after ${timeout_ms}ms waiting for: ${url}`);
}

let cleanedUp = false;
function killProcess(child, name) {
  if (!child || child.killed || child.existCode !== null) {
    return;
  }

  try {
    if (process.platform === 'win32') {
      spawn('taskkill', ['/pid', String(child.pid), '/T', '/F'], { stdio: 'ignore' });
      return;
    }

    child.kill('SIGINT');

    setTimeout(() => {
      if (child.exitCode === null && !child.killed) {
        child.kill('SIGTERM');
      }
    }, 1500);
  } catch (error) {
    console.warn(`[🧹 cleanup] failed to kill ${name}:`, error);
  }
}

function makeCleanup(getProcesses) {
  return () => {
    if (cleanedUp) {
      return;
    }

    cleanedUp = true;

    const { api, web } = getProcesses();
    killProcess(web, 'web');
    killProcess(api, 'api');
  };
}

async function main() {
  const processes = {};

  const cleanup = makeCleanup(() => processes);

  process.on('SIGINT', () => {
    cleanup();
    process.exit(130);
  });

  process.on('SIGTERM', () => {
    cleanup();
    process.exit(143);
  });

  try {
    processes.api = spawnProcess('api', apiCmd[0], apiCmd[1]);
    processes.web = spawnProcess('web', webCmd[0], webCmd[1]);

    await waitForUrl(API_URL, processes.api, { name: 'api' });
    await waitForUrl(WEB_URL, processes.web, { name: 'web' });

    const tests = spawnProcess('tests', testsCmd[0], testsCmd[1]);

    const exitCode = await new Promise((resolve) => {
      tests.on('exit', (code) => resolve(code ?? 1));
    });

    // Clean and exit with tests status
    cleanup();
    process.exit(exitCode);
  } catch (error) {
    console.log(error);
    cleanup();
    process.exit(1);
  }
}

main();
