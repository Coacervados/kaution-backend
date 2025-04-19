import { inventoryDTO } from "../dto";
import { prisma } from "../../libs/prisma";
import { ConflictError, ValidationErr, NotFoundError } from "../utils/apiError";

export class InventoryService {
  static async create(data: inventoryDTO) {
    if (!data.name || !data.userId) {
      throw new ValidationErr("All fields are required");
    }
    const exists = await prisma.inventory.findFirst({
      where: {
        userId: data.userId,
        name: data.name,
      },
    });
    if (exists) {
      throw new ConflictError("Inventory already exists");
    }

    return await prisma.inventory.create({
      data: {
        userId: data.userId,
        name: data.name,
        description: data.description,
      },
    });
  }

  static async list(userId: string) {
    if (!userId) {
      throw new ValidationErr("User ID is required");
    }

    const exists = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!exists) {
      throw new NotFoundError("User does not exist");
    }

    return await prisma.inventory.findMany({
      where: {
        userId: userId,
      },
      select: {
        id: true,
        name: true,
        userId: true,
      },
    });
  }

  static async get(id: string, userId: string) {
    const inventory = await prisma.inventory.findFirst({
      where: {
        id,
        userId,
      },
      select: {
        id: true,
        name: true,
        description: true,
        userId: true,
      },
    });

    if (!inventory) {
      throw new NotFoundError(
        "Inventory does not exist or does not belong to user"
      );
    }

    return inventory;
  }

  static async update(id: string, userId: string, data: inventoryDTO) {
    const inventory = await prisma.inventory.findFirst({
      where: {
        id,
        userId,
      },
    });
    if (!inventory) {
      throw new NotFoundError("Inventory does not exist or does not belong to user");
    }

    return await prisma.inventory.update({
      where: {
        id,
      },
      data: {
        name: data.name,
        description: data.description,
      },
      select: {
        id: true,
        name: true,
        description: true,
      },
    });
  }

  static async delete(id: string, userId: string) {
    const inventory = await prisma.inventory.findFirst({
      where: {
        id,
        userId,
      },
    });
    if (!inventory) {
      throw new NotFoundError("Inventory does not exist or does not belong to user");
    }

    return await prisma.inventory.delete({
      where: {
        id,
      },
    });
  }
}
