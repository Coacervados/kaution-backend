import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { UnauthorizedError } from "../modules/utils/apiError";

const secret = process.env.JWT_SECRET;

export interface AuthenticatedRequest extends Request {
  user?: { id: string };
}

export function authMiddleware(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthorizedError("Token not found");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, secret as string);

    if (typeof decoded === "object" && "id" in decoded) {
      req.user = { id: (decoded as JwtPayload).id as string };
      return next();
    }

    throw new UnauthorizedError("Invalid token payload");
  } catch (error) {
    throw new UnauthorizedError("Invalid token");
  }
}
