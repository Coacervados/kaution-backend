import { Express } from "express";
import userRoutes from "../routers/userRouter";

export default function routes(app: Express) {
  app.use("/users", userRoutes);
}
