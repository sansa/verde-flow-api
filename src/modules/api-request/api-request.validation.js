import { z } from "zod";

export const createApiRequestSchema = z.object({
  method: z.enum(["GET", "POST", "PUT", "DELETE", "PATCH"]),
  path: z.string().min(1),
  payload: z.record(z.any()).optional(),
  description: z.string().optional(),
  projectId: z.string().uuid(),
});

export const updateApiRequestSchema = z.object({
  method: z.enum(["GET", "POST", "PUT", "DELETE", "PATCH"]).optional(),
  path: z.string().optional(),
  payload: z.record(z.any()).optional(),
  description: z.string().optional(),
});
