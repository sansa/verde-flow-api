import express from "express";
import {
  createBranch,
  getBranches,
  getBranchById,
  updateBranch,
  deleteBranch,
} from "./branch.controller.js";
import authenticateToken from "../../middleware/auth.middleware.js";
import { validate } from "../../middleware/zod.middleware.js";
import { createBranchSchema, updateBranchSchema } from "./branch.validation.js";

const router = express.Router();

router.use(authenticateToken);

router.post("/", validate(createBranchSchema), createBranch);
router.get("/", getBranches);
router.get("/:id", getBranchById);
router.put("/:id", validate(updateBranchSchema), updateBranch);
router.delete("/:id", deleteBranch);

export default router;
