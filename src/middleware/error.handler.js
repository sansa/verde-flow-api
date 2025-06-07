import logger from "../utils/logger.js";

export default function errorHandler(err, req, res, next) {
  logger.error(err.stack || err.message);
  res.status(500).json({ error: err.message || "Internal Server Error" });
}
