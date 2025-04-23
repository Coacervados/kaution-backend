import { ConflictError, ValidationErr, NotFoundError } from "../utils/apiError";
import { prisma } from "../../libs/prisma";
import { userDTO } from "../dto";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET as string;

export class UserService {
  static async create(data: userDTO) {
    if (!data.name || !data.email || !data.password) {
      throw new ValidationErr("All fields are required");
    }

    const exists = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (exists) {
      throw new ConflictError("User already exists");
    }

    const passwordHash = await bcrypt.hash(data.password, 8);

    const createdUser = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: passwordHash,
      },
    });

    const token = jwt.sign({ id: createdUser.id }, secret, {
      expiresIn: "7d",
    });

    return {
      user: {
        name: createdUser.name,
        email: createdUser.id,
      },
      token,
    };
  }

  static async login(email: string, password: string) {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new NotFoundError("User not exists");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new ValidationErr("Invalid password");
    }

    const token = jwt.sign({ id: user.id }, secret, {
      expiresIn: "7d",
    });

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    };
  }

  static async list() {
    return await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
  }

  static async get(id: string) {
    const exists = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    if (!exists) {
      throw new NotFoundError("User not exists");
    }

    return await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        Inventory: true,
        Notifications: true,
      },
    });
  }

  static async delete(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      throw new NotFoundError("User not exists");
    }

    return await prisma.user.delete({
      where: {
        id,
      },
    });
  }

  static async update(id: string, data: userDTO) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      throw new NotFoundError("User not exists");
    }

    return await prisma.user.update({
      where: {
        id,
      },
      data: {
        name: data.name,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
  }
}
