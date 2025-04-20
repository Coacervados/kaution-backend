import { categoryDTO } from "../dto";
import { prisma } from "../../libs/prisma";
import { ConflictError, ValidationErr, NotFoundError } from "../utils/apiError";

export class CategoryService {
  static async create(data: Omit<categoryDTO, "userId">, userId: string) {
    if (!data.name || !data.inventoryId) {
      throw new ValidationErr("Name, userId and inventoryId are required");
    }

    const inventory = await prisma.inventory.findFirst({
      where: {
        id: data.inventoryId,
        userId: userId,
      },
    });
    if (!inventory) {
      throw new NotFoundError(
        "Inventory not found or does not belong to the user"
      );
    }

    const exists = await prisma.category.findFirst({
      where: {
        name: data.name,
        inventoryId: data.inventoryId,
      },
    });

    if (exists) {
      throw new ConflictError("Category already exists");
    }

    return await prisma.category.create({
      data: {
        userId,
        name: data.name,
        description: data.description,
        inventoryId: data.inventoryId,
        created: new Date(),
        updateAt: new Date(),
      },
    });
  }

  static async list(userId: string, inventoryId: string) {
    const inventory = await prisma.inventory.findFirst({
      where: {
        id: inventoryId,
        userId,
      },
    });

    if (!inventory) {
      throw new NotFoundError("Inventory does not exist or does not belong to the user");
    }

    return await prisma.category.findMany({
      where: {
        inventoryId,
      },
      select: {
        id: true,
        name: true,
        description: true,
      },
    });
  }


  static async get(categoryId: string, userId: string, inventoryId: string) {
    const category = await prisma.category.findFirst({
      where: {
        id: categoryId,
        userId,
        inventoryId,
      },
      select: {
        id: true,
        name: true,
        description: true,
        inventoryId: true,
      },
    });

    if (!category) {
      throw new NotFoundError(
        "Category does not exist or does not belong to user in this inventory"
      );
    }

    return category;
  }

  static async update(id: string, userId: string, inventoryId: string, data: categoryDTO) {
    const category = await prisma.category.findFirst({
      where: {
        id,
        userId,
        inventoryId,
      },
    });

    if (!category) {
      throw new NotFoundError("Category does not exist or does not belong to user");
    }

    return await prisma.category.update({
      where: {
        id,
      },
      data: {
        name: data.name,
        description: data.description,
        updateAt: new Date(),
      },
      select: {
        id: true,
        name: true,
        description: true,
      },
    });
  }

  static async delete(id: string, userId: string, inventoryId: string) {
    const category = await prisma.category.findFirst({
      where: {
        id,
        userId,
        inventoryId,
      },
    });

    if (!category) {
      throw new NotFoundError("Category does not exist or does not belong to user");
    }

    return await prisma.category.delete({
      where: {
        id,
      },
    });
  }
}
