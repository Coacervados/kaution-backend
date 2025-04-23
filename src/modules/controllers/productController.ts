import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../../middlewares/authMiddleware";
import { ProductService } from "../services/productService";
import { ProductRequestDTO } from "../dto";

export class ProductController {
    static async create(
        req: AuthenticatedRequest,
        res: Response,
        next: NextFunction
    ) {
        try {
            const product = req.body as ProductRequestDTO;

            const createdProduct = await ProductService.create(
                product,
                req.user!.id
            );

            res.status(201).json({
                success: true,
                message: "Product created successfully",
                data: createdProduct,
            });
        } catch (err) {
            console.error(err);
            next(err);
        }
    }

    static async getById(
        req: AuthenticatedRequest,
        res: Response,
        next: NextFunction
    ) {
        try {
            const { id } = req.params;

            const product = await ProductService.getById(id);

            res.status(200).json({
                success: true,
                data: product,
            });
        } catch (err) {
            console.error(err);
            next(err);
        }
    }

    static async getByUserId(
        req: AuthenticatedRequest,
        res: Response,
        next: NextFunction
    ) {
        try {
            const products = await ProductService.getByUserId(req.user?.id!);
            res.status(200).json({ success: true, data: products });
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
            const { id } = req.params;
            const product = req.body as ProductRequestDTO;

            const updatedProduct = await ProductService.update(id, product);

            res.status(200).json({
                success: true,
                message: "Product updated successfully",
                data: updatedProduct,
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
            const { id } = req.params;

            const product = await ProductService.delete(id);

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
