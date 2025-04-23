import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../../middlewares/authMiddleware";
import { InventoryService } from "../services/inventoryService";

export class InventoryController {
    static async create(
        req: AuthenticatedRequest,
        res: Response,
        next: NextFunction
    ) {
        try {
            const inventory = await InventoryService.create(
                req.body,
                req.user!.id
            );
            res.status(201).json({
                success: true,
                message: "Inventory created successfully",
                data: inventory,
            });
        } catch (err) {
            next(err);
            console.log(err);
        }
    }

    static async getByUserId(
        req: AuthenticatedRequest,
        res: Response,
        next: NextFunction
    ) {
        try {
            const inventories = await InventoryService.getByUserId(
                req.user!.id
            );
            res.status(200).json({
                success: true,
                message: "Inventories list",
                data: inventories,
            });
        } catch (err) {
            next(err);
            console.log(err);
        }
    }

    static async getById(
        req: AuthenticatedRequest,
        res: Response,
        next: NextFunction
    ) {
        try {
            const inventory = await InventoryService.getById(req.params.id);
            res.status(200).json({
                success: true,
                message: "Inventory",
                data: inventory,
            });
        } catch (err) {
            next(err);
            console.log(err);
        }
    }

    static async getProducts(
        req: AuthenticatedRequest,
        res: Response,
        next: NextFunction
    ) {
        try {
            const products = await InventoryService.getProducts(req.params.id);
            res.status(200).json({
                success: true,
                message: "Products",
                data: products,
            });
        } catch (err) {
            next(err);
            console.log(err);
        }
    }

    static async getCategories(
        req: AuthenticatedRequest,
        res: Response,
        next: NextFunction
    ) {
        try {
            const categories = await InventoryService.getCategories(
                req.params.id
            );
            res.status(200).json({
                success: true,
                message: "Categorie",
                data: categories,
            });
        } catch (err) {
            next(err);
            console.log(err);
        }
    }

    static async update(
        req: AuthenticatedRequest,
        res: Response,
        next: NextFunction
    ) {
        try {
            const inventory = await InventoryService.update(
                req.user!.id,
                req.body
            );
            res.status(200).json({
                success: true,
                message: "Inventory updated",
                data: inventory,
            });
        } catch (err) {
            next(err);
            console.log(err);
        }
    }

    static async delete(
        req: AuthenticatedRequest,
        res: Response,
        next: NextFunction
    ) {
        try {
            const inventory = await InventoryService.delete(req.params.id);
            res.status(200).json({
                success: true,
                message: "Inventory deleted",
                data: inventory,
            });
        } catch (err) {
            next(err);
            console.log(err);
        }
    }
}
