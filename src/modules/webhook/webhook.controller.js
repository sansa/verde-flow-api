import * as service from "./webhook.service.js";
import logger from "../../utils/logger.js";

export async function handleGitWebhook(req, res, next) {
  try {
    const result = await service.processPushEvent(req.body);
    logger.info(`Webhook processed: ${result.count} commits`);
    res.status(200).json({ message: "Webhook received", ...result });
  } catch (err) {
    logger.error("Webhook processing failed", err);
    next(err);
  }
}
