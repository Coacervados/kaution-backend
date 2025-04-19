import { categoryDTO } from "../dto";
import { prisma } from "../../libs/prisma";
import { ConflictError, ValidationErr, NotFoundError } from "../utils/apiError";

export class CategoryService {
  static async create(data: categoryDTO) {
    if (!data.name || !data.userId || !data.inventortyId) {
      throw new ValidationErr("Name, userId and inventoryId are required");
    }

    const exists = await prisma.category.findFirst({
      where: {
        name: data.name,
        inventoryId: data.inventortyId,
      },
    });

    if (exists) {
      throw new ConflictError("Category already exists");
    }

    return await prisma.category.create({
      data: {
        name: data.name,
        description: data.description,
        userId: data.userId,
        inventoryId: data.inventortyId,
        created: new Date(),
        updateAt: new Date(),
      },
    });
  }

  static async list() {
    return await prisma.category.findMany({
      select: {
        id: true,
        name: true,
        description: true,
      },
    });
  }

  static async get(id: string) {
    const exists = await prisma.category.findUnique({
      where: {
        id,
      },
    });
    if (!exists) {
      throw new NotFoundError("Category does not exist");
    }

    return await prisma.category.findUnique({
      where: {
        id,
      },
    });
  }

  static async update(id: string, data: categoryDTO) {
    const category = await prisma.category.findUnique({
      where: {
        id,
      },
    });
    if (!category) {
      throw new NotFoundError("Category does not exist");
    }

    return await prisma.category.update({
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
    const category = await prisma.category.findUnique({
      where: {
        id,
      },
    });
    if (!category) {
      throw new NotFoundError("Category does not exist");
    }

    return await prisma.category.delete({
      where: {
        id,
      },
    });
  }
}
