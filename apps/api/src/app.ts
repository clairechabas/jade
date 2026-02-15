import Fastify from 'fastify';
import { HealthResponseSchema } from '@jade/api-client';

const isDevelopment = process.env.NODE_ENV !== 'production';

export function buildApp() {
  const app = Fastify({
    logger: isDevelopment
      ? {
          transport: {
            target: 'pino-pretty',
            options: {
              translateTime: 'HH:MM:ss',
              ignore: 'pid,hostname',
            },
          },
        }
      : true,
  });

  app.get('/api/health', async () => {
    const payload = {
      ok: true,
      data: {
        status: 'ok',
        service: 'api',
        timestamp: new Date().toISOString(),
      },
    };

    return HealthResponseSchema.parse(payload);
  });

  return app;
}
