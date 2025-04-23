import type { UUID } from "../../types/uuid";

export interface CategoryResponseDTO {
    id: UUID;
    name: string;
    description: string;
    seducCode: string;
    userId: UUID;
    category: { id: UUID; name: string };
    inventory: { id: UUID; name: string };
    createdAt: Date;
    updatedAt: Date;
}

export interface CategoryRequestDTO {
    name: string;
    description: string;
    seducCode: string;
    categoryId: UUID;
    inventoryId: UUID;
    createdAt: Date;
    updatedAt: Date;
}
