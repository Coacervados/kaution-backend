import { ProductRequestDTO, ProductResponseDTO } from "../dto";
import { prisma } from "../../libs/prisma";
import { checkStock } from "../utils/checkStock";
import { ConflictError, ValidationErr, NotFoundError } from "../utils/apiError";

export class ProductService {
    static async create(data: ProductRequestDTO, userId: string) {
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

        const create = await prisma.product.create({
            data: {
                userId,
                name,
                description,
                quantity,
                minQuantity: data.minQuantity,
                categoryId,
                inventoryId,
                created: new Date(),
                updateAt: new Date(),
            },
        });

        await checkStock({
            name: create.name,
            quantity: create.quantity,
            minQuantity: create.minQuantity,
            userId: create.userId,
        });
        
        return create;
    }

    static async getByUserId(userId: string) {
        return await prisma.product.findMany({
            where: {
                userId,
            },
        });
    }

    static async getById(id: string) {
        const product = await prisma.product.findFirst({
            where: {
                id,
            },
        });

        if (!product) {
            throw new NotFoundError("Product not found");
        }

        return product;
    }

    static async update(id: string, data: Partial<ProductRequestDTO>) {
        const product = await prisma.product.findFirst({
            where: {
                id,
            },
        });

        if (!product) {
            throw new NotFoundError("Product not found");
        }

        const productUpdated = await prisma.product.update({
            where: { id },
            data: {
                ...data,
                updateAt: new Date(),
            },
        });

        await checkStock({
            ...productUpdated
        });

        return productUpdated;
    }

    static async delete(id: string) {
        const product = await prisma.product.findFirst({
            where: {
                id,
            },
        });

        if (!product) {
            throw new NotFoundError("Product not found");
        }

        return await prisma.product.delete({
            where: { id },
        });
    }
}
