import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
    // Criar um usuário
    const user = await prisma.user.create({
        data: {
            name: faker.name.fullName(),
            email: faker.internet.email(),
            password: faker.internet.password(), // Substitua por uma senha hash real
        },
    });

    console.log("Usuário criado:", user);

    // Criar um inventário
    const inventory = await prisma.inventory.create({
        data: {
            name: faker.commerce.department(),
            description: faker.commerce.productDescription(),
            userId: user.id,
        },
    });

    console.log("Inventário criado:", inventory);

    // Criar duas categorias
    const category1 = await prisma.category.create({
        data: {
            name: faker.commerce.department(),
            description: faker.commerce.productDescription(),
            userId: user.id,
            inventoryId: inventory.id,
        },
    });

    const category2 = await prisma.category.create({
        data: {
            name: faker.commerce.department(),
            description: faker.commerce.productDescription(),
            userId: user.id,
            inventoryId: inventory.id,
        },
    });

    console.log("Categorias criadas:", category1, category2);

    // Criar 5 produtos em cada categoria
    const productsCategory1 = await Promise.all(
        Array.from({ length: 5 }).map(() =>
            prisma.product.create({
                data: {
                    name: faker.commerce.productName(),
                    description: faker.commerce.productDescription(),
                    quantity: faker.number.int({ min: 1, max: 100 }),
                    seducCode: faker.string.alphanumeric(10).toUpperCase(),
                    userId: user.id,
                    categoryId: category1.id,
                    inventoryId: inventory.id,
                },
            })
        )
    );

    const productsCategory2 = await Promise.all(
        Array.from({ length: 5 }).map(() =>
            prisma.product.create({
                data: {
                    name: faker.commerce.productName(),
                    description: faker.commerce.productDescription(),
                    quantity: faker.number.int({ min: 1, max: 100 }),
                    seducCode: faker.string.alphanumeric(10).toUpperCase(),
                    userId: user.id,
                    categoryId: category2.id,
                    inventoryId: inventory.id,
                },
            })
        )
    );

    console.log("Produtos criados para Categoria 1:", productsCategory1);
    console.log("Produtos criados para Categoria 2:", productsCategory2);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });