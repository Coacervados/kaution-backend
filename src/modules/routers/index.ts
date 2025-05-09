import { Express } from "express";
import userRoutes from "../routers/userRouter";
import inventoryRouter from "../routers/inventoryRouter";
import categoryRouter from "../routers/categoryRouter";
import ProductRouter from "../routers/productRouter";

export default function routes(app: Express) {
  app.use("/users", userRoutes);
  app.use("/inventory", inventoryRouter);
  app.use("/category", categoryRouter);
  app.use("/product", ProductRouter);
}
