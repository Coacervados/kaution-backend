import { Request, Response } from "express";
import { inventoryService } from "../services/inventoryService";

export class inventoryController {
    static async create(req: Request, res: Response) {
        try {
            const inventory = await inventoryService.create(req.body);
            res.status(201).json(inventory);
        } catch (err) {
            res.status(400).json({ message: (err as Error).message });
        }
    }
}