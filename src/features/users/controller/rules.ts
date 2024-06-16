import { NextFunction, Request, Response } from "express";
import { schemaValidationForCreateUser } from "./schema";

export const validateBodyForCreateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.method !== "POST") {
    res.status(405).json({
      code: "api.live.user.validateBodyForCreateUser.failed",
      message: "method not allowed",
    });
    return;
  }
  try {
    req.body = schemaValidationForCreateUser.parse(req.body);
    next();
  } catch (error) {
    res.status(400).json({
      code: "api.live.user.validateBodyForCreateUser.failed",
      message: error,
    });
  }
};
