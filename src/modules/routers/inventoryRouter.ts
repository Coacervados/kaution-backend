import { Router } from "express";
import { inventoryController } from "../controllers/index";

const router = Router();

router.post("/", inventoryController.create);

export default router;