import { Router } from "express";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { ProductController } from "../controllers/index";

const router = Router();

router.post("/:inventoryId/:categoryId", authMiddleware, ProductController.create);
router.get("/:inventoryId/:categoryId", authMiddleware, ProductController.list);
router.get("/:inventoryId/:categoryId/:id", authMiddleware, ProductController.get);
router.put("/:inventoryId/:categoryId/:id", authMiddleware, ProductController.update);
router.delete("/:inventoryId/:categoryId/:id", authMiddleware, ProductController.delete);


export default router;