import createHttpError from "http-errors";
import { validationResult } from "express-validator";

import { Request, Response, NextFunction } from "express";

export const catchError = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = { errors: errors.array() };
    throw createHttpError(400, {
      message: "Validation failed",
      error,
    });
  } else {
    next();
  }
};