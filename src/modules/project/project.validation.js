import { z } from "zod";

export const createProjectSchema = z.object({
  name: z.string().min(1, "Project name is required"),
  gitUrl: z.string().url("Valid Git repository URL is required"),
  gitToken: z.string().optional(),
  defaultBranch: z.string().optional(),
  description: z.string().optional(),
  status: z.string().optional(),
});

export const updateProjectSchema = z.object({
  name: z.string().min(1).optional(),
  gitUrl: z.string().url().optional(),
  gitToken: z.string().optional(),
  defaultBranch: z.string().optional(),
  description: z.string().optional(),
  status: z.string().optional(),
});
