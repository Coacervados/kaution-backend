import type { UUID } from "../../types/uuid";
import type { InventoryInfo } from "../../types/InventoryInfo";

export interface CategoryResponseDTO {
    id: UUID;
    name: string;
    description: string;
    inventory: InventoryInfo;
}

export interface CategoryRequestDTO {
    name: string;
    description: string;
    inventoryId: UUID;
}
