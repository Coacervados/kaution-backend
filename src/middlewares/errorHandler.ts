import { NextFunction, Request, Response } from "express";
import { ApiError } from "../modules/utils/apiError";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
    console.log(err);
    if (err instanceof ApiError) {
        res.status(err.statusCode).json({
            success: false,
            message: err.message
        })
    }
}
