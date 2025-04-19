import { Router } from "express";
import { InventoryController } from "../controllers/index";

const router = Router();

router.post("/", InventoryController.create);
router.get("/", InventoryController.list);
router.get("/:id", InventoryController.get);
router.delete("/:id", InventoryController.delete);
router.put("/:id", InventoryController.update);

export default router;