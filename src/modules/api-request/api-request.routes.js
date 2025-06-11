import express from "express";
import {
  createApiRequest,
  getApiRequests,
  getApiRequestById,
  updateApiRequest,
  deleteApiRequest,
} from "./apiRequest.controller.js";

import authenticateToken from "../../middleware/auth.middleware.js";
import { validate } from "../../middleware/zod.middleware.js";
import {
  createApiRequestSchema,
  updateApiRequestSchema,
} from "./api-request.validation.js";

const router = express.Router();
router.use(authenticateToken);

router.post("/", validate(createApiRequestSchema), createApiRequest);
router.get("/", getApiRequests);
router.get("/:id", getApiRequestById);
router.put("/:id", validate(updateApiRequestSchema), updateApiRequest);
router.delete("/:id", deleteApiRequest);

export default router;
