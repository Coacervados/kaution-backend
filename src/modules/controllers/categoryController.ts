import { Request, Response } from "express";
import { CategoryService } from "../services/categoryService";

export class CategoryController {
    static async create(req: Request, res: Response) {
        try {
            const category = await CategoryService.create(req.body);
            res.status(201).json(category);
        } catch (err) {
            res.status(400).json({ message: (err as Error).message });
        }
    }
}