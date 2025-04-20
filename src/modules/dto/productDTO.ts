import type { UUID } from "../../types/uuid";

export interface productDTO {
    id: UUID;
    name: string;
    description: string | null;
    quantity: number;
    createdAt: Date;
    updateAt: Date;
    inventoryId: string;
    categoryId: string;
    userId: string;
    seducCode: string | null;
}