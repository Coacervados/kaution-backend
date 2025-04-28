import { Router } from "express";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { UserController } from "../controllers/index"; 

const router = Router();

router.post("/", UserController.create);
router.post("/login", UserController.login);
router.get("/", UserController.list);
router.get("/:id", UserController.get);
router.delete("/:id", authMiddleware, UserController.delete);
router.put("/:id", authMiddleware,UserController.update);

export default router;
