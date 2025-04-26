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
    if (process.env.NODE_ENV === "development") {
        req.user = {
            id: "user1",
        };
        next();
        return;
    }

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new UnauthorizedError("Token not found");
    }

    const token = authHeader.split(" ")[1];
    const secret = process.env.JWT_SECRET;

    if (!secret) {
        console.error("JWT_SECRET não foi definida no .env");
        throw new Error("JWT_SECRET is missing");
    }

    try {
        const decoded = jwt.verify(token, secret);

        if (typeof decoded === "object" && "id" in decoded) {
            req.user = { id: (decoded as JwtPayload).id as string };
            return next();
        }

        throw new UnauthorizedError("Invalid token payload");
    } catch (err) {
        console.error("Erro ao verificar token:", err);
        throw new UnauthorizedError("Invalid token");
    }
}
