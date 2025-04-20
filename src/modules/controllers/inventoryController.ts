import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../../middlewares/authMiddleware";
import { InventoryService } from "../services/inventoryService";

export class InventoryController {
  static async create(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const inventory = await InventoryService.create(req.body, req.user!.id);
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
  static async list(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const inventories = await InventoryService.list(req.user!.id);
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

  static async get(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const inventory = await InventoryService.get(
        req.params.id,
        req.user!.id
      );
      res
        .status(200)
        .json({ success: true, message: "Inventory", data: inventory });
    } catch (err) {
      next(err);
      console.log(err);
    }
  }

  static async update(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const inventory = await InventoryService.update(
        req.params.id,
        req.user!.id,
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

  static async delete(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const inventory = await InventoryService.delete(
        req.params.id,
        req.user!.id
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
