import { CategoryRequestDTO } from "../dto";
import { prisma } from "../../libs/prisma";
import { ConflictError, ValidationErr, NotFoundError } from "../utils/apiError";
import { UUID } from "crypto";

export class CategoryService {
    static async create(data: CategoryRequestDTO, userId: string) {
        if (!data.name || !data.inventoryId) {
            throw new ValidationErr("Name and inventoryId are required");
        }

        const inventory = await prisma.inventory.findFirst({
            where: {
                id: data.inventoryId,
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
                ...data,
                userId,
                updateAt: new Date(),
            },
        });
    }

    static async getByUserId(userId: string) {
        return await prisma.category.findMany({
            where: {
                userId,
            },
        });
    }

    static async getProducts(categoryId: string) {
        return await prisma.product.findMany({
            where: {
                categoryId,
            },
        });
    }

    static async getById(id: string) {
        const category = await prisma.category.findFirst({
            where: {
                id,
            },
        });

        if (!category) {
            throw new NotFoundError("Category does not exist");
        }

        return category;
    }

    static async update(id: string, data: CategoryRequestDTO) {
        const category = await prisma.category.findFirst({
            where: {
                id,
            },
        });

        if (!category) {
            throw new NotFoundError(
                "Category does not exist or does not belong to user"
            );
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
        });
    }

    static async delete(id: string) {
        const category = await prisma.category.findFirst({
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
