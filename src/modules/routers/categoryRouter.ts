import { categoryController } from "../controllers/index";
import { Router } from "express";

const router = Router();

router.post("/", categoryController.create);

export default router;
