import { CategoryResponseDTO } from "../modules/dto/categoryDTO";

export type CategoryInfo = Omit<
    CategoryResponseDTO,
    "description" | "inventoryId"
>;
