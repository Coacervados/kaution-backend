import { NotificationController } from "../controllers/notificationController";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { Router } from "express";

const router = Router();

router.get("/", authMiddleware, NotificationController.getByUser);
router.put("/", authMiddleware, NotificationController.markAsViewed);

export default router;
