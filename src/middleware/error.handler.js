import logger from "../utils/logger.js";

export const ErrorType = {
  APPLICATION: "APPLICATION",
  DATABASE: "DATABASE",
  AUTH: "AUTH",
  VALIDATION: "VALIDATION",
};

export const ErrorCode = {
  UNKNOWN: "0000",
  NOT_FOUND: "0404",
  UNAUTHORIZED: "0401",
  INVALID_INPUT: "0400",
  CONFLICT: "0409",
  DB_FAILURE: "0500",
  INVALID_CREDENTIALS: "0501",
};
export const SuccessCode = {
  OK: 1000,
  CREATED: 1001,
  ACCEPTED: 1002,
};

export default function errorHandler(err, req, res, next) {
  const {
    message = "Something went wrong",
    statusCode = 400,
    type = ErrorType.APPLICATION,
    code = ErrorCode.UNKNOWN,
    meta = undefined,
  } = err;

  logger.error(`${type} [${code}] ${message}`);

  res.status(statusCode).json({
    message,
    statusCode,
    type,
    code,
    ...(meta && { meta }),
  });
}
