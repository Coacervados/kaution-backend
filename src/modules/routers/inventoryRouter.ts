import { Router } from "express";
import { InventoryController } from "../controllers/index";

const router = Router();

router.post("/", InventoryController.create);

export default router;