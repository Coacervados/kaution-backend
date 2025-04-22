import { Request, Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../../middlewares/authMiddleware";
import { UserService } from "../services/userSevice";

export class UserController {
  static async create(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { token, user } = await UserService.create(req.body);
      res.status(201).json({
        success: true,
        message:
          "User created successfully. Please check your email to verify your account.",
        data: { user, token },
      });
    } catch (err) {
      next(err);
      console.log(err);
    }
  }

  static async login(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { user, token } = await UserService.login(
        req.body.email,
        req.body.password
      );
      res.status(200).json({
        success: true,
        message: "User logged in",
        data: { user, token },
      });
    } catch (err) {
      next(err);
      console.log(err);
    }
  }

  static async list(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const users = await UserService.list();
      res
        .status(200)
        .json({ success: true, message: "Users list", data: users });
    } catch (err) {
      next(err);
      console.log(err);
    }
  }

  static async get(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const user = await UserService.get(req.params.id);
      res.status(200).json({ success: true, message: "User", data: user });
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
      const user = await UserService.delete(req.params.id);
      res
        .status(200)
        .json({ success: true, message: "User deleted", data: user });
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
      const user = await UserService.update(req.params.id, req.body);
      res
        .status(200)
        .json({ success: true, message: "User updated", data: user });
    } catch (err) {
      next(err);
      console.log(err);
    }
  }
}
