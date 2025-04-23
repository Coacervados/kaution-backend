import { CategoryController } from "../controllers/index";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { Router } from "express";

const router = Router();

router.post("/:inventoryId", authMiddleware, CategoryController.create);
router.get("/inventory/:inventoryId", authMiddleware, CategoryController.list);
router.get("/:inventoryId/:id", authMiddleware, CategoryController.get);
router.get("/all", authMiddleware, CategoryController.all);
router.put("/:inventoryId/:id", authMiddleware, CategoryController.update);
router.delete("/:inventoryId/:id", authMiddleware, CategoryController.delete);

export default router;
