import Fastify from 'fastify';
import { HealthResponseSchema } from '@bml/api-client';

export function buildApp() {
  const app = Fastify({ logger: true });

  app.get('/health', async () => {
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
