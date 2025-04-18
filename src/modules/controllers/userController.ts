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
}
