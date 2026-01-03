import { z } from 'zod';

/**
 * Standard API response schema.
 */
export const ApiErrorSchema = z.object({
  code: z.string(),
  message: z.string(),
  details: z.unknown().optional(),
});
export type ApiError = z.infer<typeof ApiErrorSchema>;

export const ApiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    ok: z.literal(true),
    data: dataSchema,
  });

export const ApiFailureSchema = z.object({
  ok: z.literal(false),
  error: ApiErrorSchema,
});

export const ApiResultSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.union([ApiResponseSchema(dataSchema), ApiFailureSchema]);

export type ApiResult<T> = { ok: true; data: T } | { ok: false; error: ApiError };
