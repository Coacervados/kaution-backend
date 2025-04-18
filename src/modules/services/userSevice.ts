import { ConflictError, ValidationErr } from "../utils/ApiError";
import { prisma } from "../../libs/prisma";
import { userDTO } from "../dto";
import bcrypt from "bcryptjs";

export class UserService {
    static async create(data: userDTO) {
        if (!data.name || !data.email || !data.password) {
            throw new ValidationErr("All fields are required");
        }

        const exists = await prisma.user.findUnique({
            where: {
                email: data.email
            }
        });
        if (exists) {
            throw new ConflictError("User already exists");
        }
        const passwordHash = await bcrypt.hash(data.password, 8);
        
        return await prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: passwordHash
            },
        });
    }
}