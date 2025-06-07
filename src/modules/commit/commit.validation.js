import { z } from "zod";

export const createCommitSchema = z.object({
  hash: z.string().min(1),
  message: z.string().optional(),
  authorName: z.string().min(1),
  authorEmail: z.string().email(),
  committedAt: z.string().datetime(),
  branchId: z.string().uuid(),
});
