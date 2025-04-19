import { Request, Response, NextFunction } from "express";
import { CategoryService } from "../services/categoryService";

export class CategoryController {
  static async create(req: Request, res: Response) {
    try {
      const category = await CategoryService.create(req.body);
      res.status(201).json({
        success: true,
        message: "Category created successfully",
        data: category,
      });
    } catch (err) {
      res.status(400).json({ message: (err as Error).message });
      console.log(err);
    }
  }

  static async list(req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await CategoryService.list();
      res
        .status(200)
        .json({ success: true, message: "Categories list", data: categories });
    } catch (err) {
      next(err);
      console.log(err);
    }
  }

  static async get(req: Request, res: Response, next: NextFunction) {
    try {
      const category = await CategoryService.get(req.params.id);
      res
        .status(200)
        .json({ success: true, message: "Category", data: category });
    } catch (err) {
      next(err);
      console.log(err);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const category = await CategoryService.update(req.params.id, req.body);
      res
        .status(200)
        .json({ success: true, message: "Category updated", data: category });
    } catch (err) {
      next(err);
      console.log(err);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const category = await CategoryService.delete(req.params.id);
      res
        .status(200)
        .json({ success: true, message: "Category deleted", data: category });
    } catch (err) {
      next(err);
      console.log(err);
    }
  }
}
