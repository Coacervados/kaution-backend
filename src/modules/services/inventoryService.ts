import { inventoryDTO } from "../dto";
import { prisma } from "../../libs/prisma";

export class InventoryService {
    static async create(data: inventoryDTO) {

        const exists = await prisma.inventory.findUnique({
            where: {
                id: data.userId,
                name: data.name
            }
        });
        if (exists) {
            throw new Error("Inventory already exists");
        }

        const inventory = await prisma.inventory.create({
            data: {
                userId: data.userId,
                name: data.name,
                description: data.description
            }
        });
        return inventory
    }
}
