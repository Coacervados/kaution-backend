import { CategoryController } from "../controllers/index";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { Router } from "express";

const router = Router();

router.post("/", authMiddleware, CategoryController.create);
router.get("/:id", authMiddleware,CategoryController.getByUserId);
router.get("/:id/products", authMiddleware,CategoryController.getProducts);
router.get("/:categoryId/:orderBy/:order/products/pdf", authMiddleware,CategoryController.pdfGenerate);
router.get("/:id", authMiddleware, CategoryController.getById);
router.put("/:id", authMiddleware, CategoryController.update);
router.delete("/:id", authMiddleware, CategoryController.delete);

export default router;
