import { productDTO } from "../dto";
import { prisma } from "../../libs/prisma";
import { ConflictError, ValidationErr } from "../utils/apiError";

export class ProductService {
    static async create(data: productDTO) {
        if (!data.name || !data.quantity || !data.categoryId || !data.inventoryId) {
            return new ValidationErr("All fields are required");
        }
        const exists = await prisma.product.findUnique({
            where: {
                id: data.id,
                name: data.name
            }
        });

        if (exists) {
            throw new ConflictError("Product already exists");
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