import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../../middlewares/authMiddleware";
import { ProductService } from "../services/productService";

export class ProductController {
  static async create(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { inventoryId, categoryId } = req.params;

      const product = await ProductService.create(
        {
          ...req.body,
          categoryId,
          inventoryId,
        },
        req.user!.id
      );

      res.status(201).json({
        success: true,
        message: "Product created successfully",
        data: product,
      });
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  static async list(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { inventoryId, categoryId } = req.params;

      const products = await ProductService.list(
        req.user!.id,
        inventoryId,
        categoryId
      );

      res.status(200).json({
        success: true,
        data: products,
      });
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  static async get(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id, inventoryId, categoryId } = req.params;

      const product = await ProductService.get(
        id,
        req.user!.id,
        inventoryId,
        categoryId
      );

      res.status(200).json({
        success: true,
        data: product,
      });
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  static async update(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id, inventoryId, categoryId } = req.params;

      const product = await ProductService.update(
        id,
        req.user!.id,
        inventoryId,
        categoryId,
        req.body
      );

      res.status(200).json({
        success: true,
        message: "Product updated successfully",
        data: product,
      });
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  static async delete(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id, inventoryId, categoryId } = req.params;

      const product = await ProductService.delete(
        id,
        req.user!.id,
        inventoryId,
        categoryId
      );

      res.status(200).json({
        success: true,
        message: "Product deleted successfully",
        data: product,
      });
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
}
