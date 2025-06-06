import type { UUID } from "../../types/uuid";

export interface ProductResponseDTO {
    id: UUID;
    name: string;
    description: string | null;
    quantity: number;
    createdAt: Date;
    updateAt: Date;
    inventory: { id: UUID; name: string };
    category: { id: UUID; name: string };
    userId: string;
    seducCode: string | null;
}

export interface ProductRequestDTO {
    name: string;
    description: string | null;
    quantity: number;
    inventoryId: UUID;
    categoryId: UUID;
    seducCode: string | null;
}
