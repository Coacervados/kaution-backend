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

    static async list(){
        return await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true
            }
        });
    }

    static async get(id: string){
        const exists = await prisma.user.findUnique({
            where: {
                id: id
            }
        });
        if (!exists) {
            throw new ConflictError("User not exists");
        }

        return await prisma.user.findUnique({
            where: {
                id
            },
            select: {
                id: true,
                name: true,
                email: true,
                Inventory: true,
                Notifications: true
            }
        });
    }

    static async delete(id: string){
        const user = await prisma.user.findUnique({
            where: {
                id
            }
        });
        if (!user) {
            throw new ConflictError("User not exists");
        }

        return await prisma.user.delete({
            where: {
                id
            }
        });
    }

    static async update(id: string, data: userDTO){
        const user = await prisma.user.findUnique({
            where: {
                id
            }
        });
        if (!user) {
            throw new ConflictError("User not exists");
        }

        return await prisma.user.update({
            where: {
                id
            },
            data: {
                name: data.name
            },
            select: {
                id: true,
                name: true,
                email: true
            }
        });
    }
}