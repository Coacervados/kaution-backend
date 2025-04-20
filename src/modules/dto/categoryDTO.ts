import type { UUID } from "../../types/uuid";

export interface categoryDTO {
    id: UUID;
    name: string;
    description: string | null;
    createdAt: Date;
    updateAt: Date;
    inventoryId: string;
    userId: string;
    products: string[];
}