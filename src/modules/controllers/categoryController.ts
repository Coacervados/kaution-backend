import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../../middlewares/authMiddleware";
import { CategoryService } from "../services/categoryService";
import { CategoryRequestDTO } from "../dto";

export class CategoryController {
    static async create(
        req: AuthenticatedRequest,
        res: Response,
        next: NextFunction
    ) {
        const category = req.body as CategoryRequestDTO;

        try {
            const createdCategory = await CategoryService.create(
                category,
                req.user?.id!
            );
            res.status(201).json({ success: true, data: createdCategory });
        } catch (err) {
            next(err);
        }
    }

    static async getByUserId(
        req: AuthenticatedRequest,
        res: Response,
        next: NextFunction
    ) {
        try {
            const categories = await CategoryService.getByUserId(req.user!.id);
            res.status(200).json({ success: true, data: categories });
        } catch (err) {
            next(err);
        }
    }

    static async getProducts(
        req: AuthenticatedRequest,
        res: Response,
        next: NextFunction
    ) {
        try {
            const products = await CategoryService.getProducts(
                req.params.categoryId
            );
            res.status(200).json({ success: true, data: products });
        } catch (err) {
            next(err);
        }
    }

    static async getById(
        req: AuthenticatedRequest,
        res: Response,
        next: NextFunction
    ) {
        try {
            const category = await CategoryService.getById(req.params.id);
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
                req.user!.id,
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
            const category = await CategoryService.delete(req.params.id);
            res.status(200).json({ success: true, data: category });
        } catch (err) {
            next(err);
        }
    }
}
