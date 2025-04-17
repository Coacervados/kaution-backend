import { Application, Router } from "express";
import userRouter from "./userRouter";

export default (app: Application) => {
    const router = Router();

    router.use("/users", userRouter);

    app.use(router);
}