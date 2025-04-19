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

  static async list() {
    return await prisma.inventory.findMany({
      select: {
        id: true,
        name: true,
        userId: true,
      },
    });
  }

  static async get(id: string) {
    const exists = await prisma.inventory.findUnique({
      where: {
        id,
      },
    });
    if (!exists) {
      throw new NotFoundError("Inventory does not exist");
    }

    return await prisma.inventory.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        description: true,
        userId: true,
      },
    });
  }

  static async update(id: string, data: inventoryDTO) {
    const inventory = await prisma.inventory.findUnique({
      where: {
        id,
      },
    });
    if (!inventory) {
      throw new NotFoundError("Inventory does not exist");
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

  static async delete(id: string) {
    const inventory = await prisma.inventory.findUnique({
      where: {
        id: id,
      },
    });
    if (!inventory) {
      throw new NotFoundError("Inventory does not exist");
    }

    return await prisma.inventory.delete({
      where: {
        id: id,
      },
    });
  }
}
