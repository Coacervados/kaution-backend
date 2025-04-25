import { CategoryController } from "../controllers/index";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { Router } from "express";

const router = Router();

router.post("/", authMiddleware, CategoryController.create);
router.get("/:id", CategoryController.getByUserId);
router.get("/:id/products", CategoryController.getProducts);
router.get("/:categoryId/:orderBy/:order/products/pdf", CategoryController.pdfGenerate);
router.get("/:id", authMiddleware, CategoryController.getById);
router.put("/:id", authMiddleware, CategoryController.update);
router.delete("/:id", authMiddleware, CategoryController.delete);

export default router;
