import { NotificationService } from "../services/notificationService";
import { NotificationRequestDTO } from "../dto/notificationDTO";
import { NextFunction, Request, Response } from "express";
import { AuthenticatedRequest } from "../../middlewares/authMiddleware";

export class NotificationController {
    static async getByUser(
        req: AuthenticatedRequest,
        res: Response,
        next: NextFunction
    ) {
        try {
            const data = req.body as NotificationRequestDTO;

            const notifications = await NotificationService.getByUser(data);

            res.status(200).json({ success: true, data: notifications });
        } catch (err) {
            next(err);
            console.log(err);
        }
    }
}
