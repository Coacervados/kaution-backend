import { Request, Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../../middlewares/authMiddleware";
import { CategoryService } from "../services/categoryService";

export class CategoryController {
  static async create(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const category = await CategoryService.create(req.body, req.user!.id);
      res.status(201).json({ success: true, data: category });
    } catch (err) {
      next(err);
    }
  }

  static async list(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const categories = await CategoryService.list(
        req.user!.id,
        req.params.id
      );
      res.status(200).json({ success: true, data: categories });
    } catch (err) {
      next(err);
    }
  }

  static async get(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const category = await CategoryService.get(
        req.params.id,
        req.user!.id,
        req.params.inventoryId
      );
      res.status(200).json({ success: true, data: category });
    } catch (err) {
      next(err);
    }
  }

  static async update(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const category = await CategoryService.update(
        req.params.id,
        req.user!.id,
        req.params.inventoryId,
        req.body
      );
      res.status(200).json({ success: true, data: category });
    } catch (err) {
      next(err);
    }
  }

  static async delete(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const category = await CategoryService.delete(
        req.params.id,
        req.user!.id,
        req.params.inventoryId
      );
      res.status(200).json({ success: true, data: category });
    } catch (err) {
      next(err);
    }
  }
}
