import type { InventoryResponseDTO } from "../modules/dto/inventoryDTO";

export type InventoryInfo = Omit<InventoryResponseDTO, "description">;
