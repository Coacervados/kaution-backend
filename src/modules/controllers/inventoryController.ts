import { Request, Response, NextFunction } from "express";
import { InventoryService } from "../services/inventoryService";

export class InventoryController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const inventory = await InventoryService.create(req.body);
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
  static async list(req: Request, res: Response, next: NextFunction) {
    try {
      const inventories = await InventoryService.list(req.params.userId);
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

  static async get(req: Request, res: Response, next: NextFunction) {
    try {
      const inventory = await InventoryService.get(
        req.params.id,
        req.params.userId
      );
      res
        .status(200)
        .json({ success: true, message: "Inventory", data: inventory });
    } catch (err) {
      next(err);
      console.log(err);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const inventory = await InventoryService.update(
        req.params.id,
        req.params.userId,
        req.body
      );
      res
        .status(200)
        .json({ success: true, message: "Inventory updated", data: inventory });
    } catch (err) {
      next(err);
      console.log(err);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const inventory = await InventoryService.delete(
        req.params.id,
        req.params.userId
      );
      res
        .status(200)
        .json({ success: true, message: "Inventory deleted", data: inventory });
    } catch (err) {
      next(err);
      console.log(err);
    }
  }
}
