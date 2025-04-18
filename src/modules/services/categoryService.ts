import { categoryDTO } from "../dto";
import { prisma } from "../../libs/prisma";

export class categoryService {
  async create(data: categoryDTO) {
    
    const exists = await prisma.category.findUnique({
        where: {
            name: data.name,
            id: data.inventortyId
        }
    })

    if (exists) {
        throw new Error("Category already exists");
    }

    const category = await prisma.category.create({
      data: {
        name: data.name,
        description: data.description,
        userId: data.userId,
        inventoryId: data.inventortyId,
        created: new Date(),
        updateAt: new Date(),
      },
    });
    return category;
  }
}
