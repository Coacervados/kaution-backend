import { productDTO } from "../dto";
import { prisma } from "../../libs/prisma";

export class ProductService {
    static async create(data: productDTO) {
        const exists = await prisma.product.findUnique({
            where: {
                id: data.id,
                name: data.name
            }
        });

        if (exists) {
            throw new Error("Product already exists");
        }

        return await prisma.product.create({
            data: {
                name: data.name,
                description: data.description,
                quantity: data.quantity,
                categoryId: data.categoryId,
                inventoryId: data.inventoryId,
                seducCode: data.seducCode,
                created: new Date(),
                updateAt: new Date()
            }
        });
    }
}