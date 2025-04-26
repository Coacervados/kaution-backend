import { UUID } from "../../types/uuid";
import { CategoryInfo } from "../../types/categoryInfor";
import { InventoryInfo } from "../../types/InventoryInfo";

export interface ProductResponseDTO {
    id: UUID;
    name: string;
    description: string | null;
    quantity: number;
    updatedAt: Date;
    seducCode: string;
    category: CategoryInfo;
    inventory: InventoryInfo;
    minQuantity: number;
}

export interface ProductRequestDTO {
    name: string;
    description: string | null;
    quantity: number;
    seducCode: string;
    categoryId: UUID;
    inventoryId: UUID;
    minQuantity: number;
}
