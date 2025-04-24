import { prisma } from "../../libs/prisma";
import { ProductResponseDTO } from "../dto";

export async function checkStock(
    data: ProductResponseDTO & { minQuantity?: number }
) {
    if (data.minQuantity !== undefined && data.quantity <= data.minQuantity) {
        const message = `Low stock "${data.name}". Current: ${data.quantity}, minimum: ${data.minQuantity}`;

        const exists = await prisma.notifications.findFirst({
            where: {
                userId: data.userId,
                message,
                viewed: false,
            },
        });

        if (!exists) {
            await prisma.notifications.create({
                data: {
                    userId: data.userId,
                    message,
                },
            });
        }
    }
}
