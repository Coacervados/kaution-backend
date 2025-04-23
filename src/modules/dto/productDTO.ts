import type { UUID } from "../../types/uuid";

export interface ProductResponseDTO {
    id: UUID;
    name: string;
    description: string | null;
    quantity: number;
    createdAt: Date;
    updateAt: Date;
    inventory: { id: string; name: string };
    category: { id: string; name: string };
    userId: string;
    seducCode: string | null;
}

export interface ProductRequestDTO {
    name: string;
    description: string | null;
    quantity: number;
    inventoryId: string;
    categoryId: string;
    seducCode: string | null;
}
