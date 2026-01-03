import { z } from 'zod';
import { ApiResultSchema } from './api';

export const HealthSchema = z.object({
  status: z.literal('ok'),
  service: z.string(),
  timestamp: z.string(),
});
export type Health = z.infer<typeof HealthSchema>;

export const HealthResponseSchema = ApiResultSchema(HealthSchema);
export type HealthResponse = z.infer<typeof HealthResponseSchema>;
