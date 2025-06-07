import { z } from "zod";

export const createBranchSchema = z.object({
  name: z.string().min(1, "Branch name is required"),
  projectId: z.string().uuid("Invalid project ID"),
});

export const updateBranchSchema = z.object({
  name: z.string().min(1, "Branch name is required").optional(),
});
