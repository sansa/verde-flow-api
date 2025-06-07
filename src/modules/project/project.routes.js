import express from "express";
import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
} from "./project.controller.js";
import { validate } from "../../middleware/zod.middleware.js";
import {
  createProjectSchema,
  updateProjectSchema,
} from "./project.validation.js";
import authenticateToken from "../../middleware/auth.middleware.js";

const router = express.Router();

router.use(authenticateToken);

router.post("/", validate(createProjectSchema), createProject);
router.get("/", getProjects);
router.get("/:id", getProjectById);
router.put("/:id", validate(updateProjectSchema), updateProject);
router.delete("/:id", deleteProject);

export default router;
