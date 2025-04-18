import { Router } from "express";
import { ProductController } from "../controllers/index";

const router = Router();

router.post("/", ProductController.create);

export default router;