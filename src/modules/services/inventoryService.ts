import { InventoryResponseDTO } from "../dto";
import { prisma } from "../../libs/prisma";
import { ConflictError, ValidationErr, NotFoundError } from "../utils/apiError";

export class InventoryService {
    static async create(
        data: Omit<InventoryResponseDTO, "userId">,
        userId: string
    ) {
        if (!data.name) {
            throw new ValidationErr("All fields are required");
        }

        const exists = await prisma.inventory.findFirst({
            where: {
                userId,
                name: data.name,
            },
        });

        if (exists) {
            throw new ConflictError("Inventory already exists");
        }

        return await prisma.inventory.create({
            data: {
                userId,
                name: data.name,
                description: data.description,
            },
        });
    }

    static async getByUserId(userId: string) {
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
        });
    }

    static async getProducts(inventoryId: string) {
        const exists = await prisma.inventory.findFirst({
            where: {
                id: inventoryId,
            },
        });

        if (!exists) {
            throw new NotFoundError("Inventory does not exist");
        }

        return await prisma.product.findMany({
            where: {
                inventoryId,
            },
        });
    }

    static async getCategories(inventoryId: string) {
        const exists = await prisma.inventory.findFirst({
            where: {
                id: inventoryId,
            },
        });

        if (!exists) {
            throw new NotFoundError("Inventory does not exist");
        }

        return await prisma.category.findMany({
            where: {
                inventoryId,
            },
        });
    }

    static async getById(id: string) {
        const inventory = await prisma.inventory.findFirst({
            where: {
                id,
            },
        });

        if (!inventory) {
            throw new NotFoundError("Inventory does not exist");
        }

        return inventory;
    }

    static async update(
        id: string,
        data: Omit<InventoryResponseDTO, "userId">
    ) {
        const inventory = await prisma.inventory.findFirst({
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
        });
    }

    static async delete(id: string) {
        const inventory = await prisma.inventory.findFirst({
            where: {
                id,
            },
        });

        if (!inventory) {
            throw new NotFoundError("Inventory does not exist");
        }

        return await prisma.inventory.delete({
            where: {
                id,
            },
        });
    }
}
