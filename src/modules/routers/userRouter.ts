import { Router } from "express";
import { UserController } from "../controllers/index"; 

const router = Router();

router.post("/", UserController.create);

export default router;
