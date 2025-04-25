import { prisma } from "../../libs/prisma";

type MinimalProduct = {
    name: string;
    quantity: number;
    minQuantity: number | null;
    userId: string;
};

export async function checkStock(data: MinimalProduct) {
    if (typeof data.minQuantity === 'number' && data.quantity <= data.minQuantity) {
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
