import { CategoryController } from "../controllers/index";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { Router } from "express";

const router = Router();

router.post("/",authMiddleware, CategoryController.create);
router.get("/",authMiddleware, CategoryController.list);
router.get("/:id",authMiddleware, CategoryController.get);
router.delete("/:id", authMiddleware, CategoryController.delete);
router.put("/:id",authMiddleware, CategoryController.update);

export default router;
