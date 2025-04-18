import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/userSevice";

export class UserController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await UserService.create(req.body);
      res.status(201).json({
        success: true,
        message:
          "User created successfully. Please check your email to verify your account.",
        data: user,
      });
    } catch (err) {
      next(err);
      console.log(err);
    }
  }

  static async list(req: Request, res: Response) {
    try {
      const users = await UserService.list();
      res.status(200).json({ success: true, data: users });
    } catch (err) {
      console.log(err);
    }
  }

  static async get(req: Request, res: Response) {
    try {
      const user = await UserService.get(req.params.id);
      res.status(200).json({ success: true, data: user });
    } catch (err) {
      console.log(err);
    }
  }
}
