import express from "express";
import { handleGitWebhook } from "./webhook.controller.js";

const router = express.Router();

// No auth on webhooks — use secret instead if needed
router.post("/git", express.json(), handleGitWebhook);

export default router;
