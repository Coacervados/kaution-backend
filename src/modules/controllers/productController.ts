import { Request, Response } from "express";
import { ProductService } from "../services/productService";

export class ProductController {
    static async create(req: Request, res: Response) {
        try {
            const product = await ProductService.create(req.body);
            res.status(201).json(product);
        } catch (err) {
            res.status(400).json({ message: (err as Error).message });
        }
    }
}