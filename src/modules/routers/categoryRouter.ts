import { CategoryController } from "../controllers/index";
import { Router } from "express";

const router = Router();

router.post("/", CategoryController.create);
router.get("/", CategoryController.list);
router.get("/:id", CategoryController.get);
router.delete("/:id", CategoryController.delete);
router.put("/:id", CategoryController.update);

export default router;
