import { prisma } from "../../libs/prisma";
import { NotificationRequestDTO } from "../dto/notificationDTO";
import { NotFoundError } from "../utils/apiError";

export class NotificationService {
    static async getByUser(data: NotificationRequestDTO) {
        const notifications = await prisma.notifications.findMany({
            where: {
                userId: data.userId,
            },
            orderBy: {
                sendAt: "desc",
            },
        });

        return notifications;
    }

    static async markAsViewed(data: NotificationRequestDTO) {
        const notification = await prisma.notifications.findFirst({
            where: {
                id: data.id,
            },
        });

        if (!notification) {
            throw new NotFoundError("Notification not found");
        }

        return await prisma.notifications.update({
            where: {
                id: data.id,
            },
            data: {
                viewed: true,
            },
        });
    }
}
