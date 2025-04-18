import { CategoryController } from "../controllers/index";
import { Router } from "express";

const router = Router();

router.post("/", CategoryController.create);

export default router;
