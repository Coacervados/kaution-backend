import { Router } from "express";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { InventoryController } from "../controllers/index";

const router = Router();

router.post("/", authMiddleware, InventoryController.create);
router.get("/", authMiddleware, InventoryController.getByUserId);
router.get("/:id", authMiddleware, InventoryController.getById);
router.get("/:id/products", authMiddleware, InventoryController.getProducts);
router.get(
    "/:id/categories",
    authMiddleware,
    InventoryController.getCategories
);
router.delete("/:id", authMiddleware, InventoryController.delete);
router.put("/:id", authMiddleware, InventoryController.update);

export default router;
