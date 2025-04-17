import type { UUID } from "../../types/uuid";

export interface categoryDTO {
    id: UUID;
    name: string;
    description: string | null;
    createdAt: Date;
    updateAt: Date;
    inventortyId: string;
    userId: string;
}