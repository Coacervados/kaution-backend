import { Router } from "express";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { InventoryController } from "../controllers/index";

const router = Router();

router.post("/", authMiddleware, InventoryController.create);
router.get("/user", authMiddleware, InventoryController.list);
router.get("/user/:id", authMiddleware, InventoryController.get);
router.delete("/user/:id", authMiddleware, InventoryController.delete);
router.put("/user/:id", authMiddleware, InventoryController.update);

export default router;