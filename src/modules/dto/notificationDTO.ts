import { UUID } from "../../types/uuid";

export interface NotificationResponseDTO {
    userId: string;
    message: string;
    viewed?: boolean;
}

export interface NotificationRequestDTO {
    id: UUID;
    userId: UUID;
    message: string;
    sendAt: Date;
    viewedAt: Date;
    viewed: boolean;
}