import { Router } from "express";
import { UserController } from "../controllers/index"; 

const router = Router();

router.post("/", UserController.create);
router.get("/", UserController.list);
router.get("/:id", UserController.get);
router.delete("/:id", UserController.delete);
router.put("/:id", UserController.update);

export default router;
