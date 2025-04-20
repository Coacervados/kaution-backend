import { productDTO } from "../dto";
import { prisma } from "../../libs/prisma";
import { ConflictError, ValidationErr, NotFoundError } from "../utils/apiError";

export class ProductService {
  static async create(data: Omit<productDTO, "userId">, userId: string) {
    const { name, quantity, inventoryId, categoryId, description } = data;

    if (!name || quantity == null || !inventoryId || !categoryId) {
      throw new ValidationErr(
        "Name, quantity, inventoryId and categoryId are required"
      );
    }

    const inventory = await prisma.inventory.findFirst({
      where: {
        id: inventoryId,
        userId,
      },
    });

    if (!inventory) {
      throw new NotFoundError(
        "Inventory not found or does not belong to the user"
      );
    }

    const category = await prisma.category.findFirst({
      where: {
        id: categoryId,
        inventoryId,
        userId,
      },
    });

    if (!category) {
      throw new NotFoundError(
        "Category not found in this inventory for the user"
      );
    }

    const exists = await prisma.product.findFirst({
      where: {
        name,
        categoryId,
      },
    });

    if (exists) {
      throw new ConflictError("Product already exists in this category");
    }

    return await prisma.product.create({
      data: {
        userId,
        name,
        description,
        quantity,
        categoryId,
        inventoryId,
        created: new Date(),
        updateAt: new Date(),
      },
    });
  }
  static async list(userId: string, inventoryId: string, categoryId: string) {
    const inventory = await prisma.inventory.findFirst({
      where: {
        id: inventoryId,
        userId,
      },
    });

    if (!inventory) {
      throw new NotFoundError(
        "Inventory does not exist or does not belong to the user"
      );
    }

    const category = await prisma.category.findFirst({
      where: {
        id: categoryId,
        inventoryId,
        userId,
      },
    });

    if (!category) {
      throw new NotFoundError(
        "Category does not exist in this inventory for the user"
      );
    }

    return await prisma.product.findMany({
      where: {
        categoryId,
      },
      select: {
        id: true,
        name: true,
        quantity: true,
        description: true,
      },
    });
  }

  static async get(
    productId: string,
    userId: string,
    inventoryId: string,
    categoryId: string
  ) {
    const product = await prisma.product.findFirst({
      where: {
        id: productId,
        userId,
        inventoryId,
        categoryId,
      },
      select: {
        id: true,
        name: true,
        quantity: true,
        description: true,
        categoryId: true,
      },
    });

    if (!product) {
      throw new NotFoundError(
        "Product not found or does not belong to the user in this category"
      );
    }

    return product;
  }

  static async update(
    id: string,
    userId: string,
    inventoryId: string,
    categoryId: string,
    data: Partial<Omit<productDTO, "id" | "userId">>
  ) {
    const product = await prisma.product.findFirst({
      where: {
        id,
        userId,
        inventoryId,
        categoryId,
      },
    });

    if (!product) {
      throw new NotFoundError(
        "Product not found or does not belong to the user"
      );
    }

    return await prisma.product.update({
      where: { id },
      data: {
        ...data,
        updateAt: new Date(),
      },
      select: {
        id: true,
        name: true,
        quantity: true,
        description: true,
      },
    });
  }

  static async delete(
    id: string,
    userId: string,
    inventoryId: string,
    categoryId: string
  ) {
    const product = await prisma.product.findFirst({
      where: {
        id,
        userId,
        inventoryId,
        categoryId,
      },
    });

    if (!product) {
      throw new NotFoundError(
        "Product not found or does not belong to the user"
      );
    }

    return await prisma.product.delete({
      where: { id },
    });
  }
}
