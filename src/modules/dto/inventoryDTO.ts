import type { UUID } from "../../types/uuid";

export interface InventoryResponseDTO {
    id: UUID;
    name: string;
    description: string;
    createdAt: Date;
    updateAt: Date;
    userId: UUID;
}
