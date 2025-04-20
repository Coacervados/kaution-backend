import { Router } from "express";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { InventoryController } from "../controllers/index";

const router = Router();

router.post("/", authMiddleware, InventoryController.create);
router.get("/user/:userId", authMiddleware, InventoryController.list);
router.get("/user/:userId/:id", authMiddleware, InventoryController.get);
router.delete("/user/:id", authMiddleware, InventoryController.delete);
router.put("/user/:userId/inventories/:id", authMiddleware, InventoryController.update);

export default router;