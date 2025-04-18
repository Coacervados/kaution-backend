import { prisma } from "../../libs/prisma";
import { userDTO } from "../dto";
import bcrypt from "bcryptjs";

export class UserService {
    static async create(data: userDTO) {
        const exists = await prisma.user.findUnique({
            where: {
                email: data.email
            }
        });
        if (exists) {
            throw new Error("Email already exists");
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