import express from "express";
import { createCommit, getCommitsByBranch } from "./commit.controller.js";
import { validate } from "../../middleware/zod.middleware.js";
import { createCommitSchema } from "./commit.validation.js";
import authenticateToken from "../../middleware/auth.middleware.js";

const router = express.Router();
router.use(authenticateToken);

// Automated commit ingestion
router.post("/", validate(createCommitSchema), createCommit);

// View commit history
router.get("/branch/:branchId", getCommitsByBranch);

export default router;
