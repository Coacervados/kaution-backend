import { Router } from "express";
import { InventoryController } from "../controllers/index";

const router = Router();

router.post("/", InventoryController.create);
router.get("/user/:userId", InventoryController.list);
router.get("/user/:userId/:id", InventoryController.get);
router.delete("/user/:id", InventoryController.delete);
router.put("/user/:userId/inventories/:id", InventoryController.update);

export default router;