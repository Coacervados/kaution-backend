import { Request, Response } from "express";
import { InventoryService } from "../services/inventoryService";

export class InventoryController {
    static async create(req: Request, res: Response) {
        try {
            const inventory = await InventoryService.create(req.body);
            res.status(201).json({
                success: true,
                message: "Inventory created successfully",
                data: inventory
            });
        } catch (err) {
            res.status(400).json({ message: (err as Error).message });
            console.log(err);
        }
    }
}