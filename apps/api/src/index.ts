import pc from 'picocolors';
import { buildApp } from './app';

const app = buildApp();

const port = 3001;
const host = process.env.HOST ?? '127.0.0.1';

app
  .listen({ port, host })
  .then(() => {
    console.log(pc.green(`🚀 API running at http://${host}:${port}`));
  })
  .catch((err) => {
    app.log.error(err);
    process.exit(1);
  });
