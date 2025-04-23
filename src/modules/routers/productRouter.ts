import { Router } from "express";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { ProductController } from "../controllers/index";

const router = Router();

router.post("/", authMiddleware, ProductController.create);
router.get("/", authMiddleware, ProductController.getByUserId);
router.get("/:id", authMiddleware, ProductController.getById);
router.put("/:id", authMiddleware, ProductController.update);
router.delete("/:id", authMiddleware, ProductController.delete);

export default router;
