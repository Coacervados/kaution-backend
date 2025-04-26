import type { UUID } from "../../types/uuid";

export interface InventoryResponseDTO {
    id: UUID;
    name: string;
    description: string;
}

export interface InventoryRequestDTO {
    name: string;
    description: string;
}
