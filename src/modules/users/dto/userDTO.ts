import type { UUID } from "../../../types/uuid";

export interface userDTO {
    id: UUID;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updateAt: Date;
}