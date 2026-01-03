import { describe, it, expect } from 'vitest';
import { buildApp } from './app';
import { HealthResponseSchema } from '@bml/api-client';

describe('GET /health', () => {
  it('returns a valid HealthResponse', async () => {
    const app = buildApp();
    await app.ready();

    const res = await app.inject({
      method: 'GET',
      url: '/health',
    });

    expect(res.statusCode).toBe(200);

    const json = res.json();
    const parsed = HealthResponseSchema.parse(json);
    expect(parsed.ok).toBe(true);

    if (parsed.ok) {
      expect(parsed.data.status).toBe('ok');
      expect(parsed.data.service).toBe('api');
      expect(typeof parsed.data.timestamp).toBe('string');
    }
  });
});
