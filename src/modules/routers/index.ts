import { Express } from "express";
import userRoutes from "../routers/userRouter";
import inventoryRouter from "../routers/inventoryRouter";

export default function routes(app: Express) {
  app.use("/users", userRoutes);
  app.use("/inventory", inventoryRouter);
}
