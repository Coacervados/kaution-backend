import { faker } from "@faker-js/faker/locale/pt_BR";
import { PrismaClient } from "../client/index";

const prisma = new PrismaClient();

type Configs = {
    usersIds: string[];
    inventoriesPerUser: number;
    categoriesPerInventory: number;
    productsPerCategory: number;
    productQuantityVariancy: [number, number];
};

class DatabaseSeeder {
    private configs: Configs;

    setConfigs(configs: Configs): this {
        this.configs = configs;
        return this;
    }

    async seed() {
        this.seedUsers();
        const inventories = await this.seedInventories();
        const categories = await this.seedCategories(inventories);
        this.seedProducts(categories);
    }

    private seedUsers() {
        return Promise.all(
            this.configs.usersIds.map((userId) => {
                const name = faker.person.firstName();
                return prisma.user.create({
                    data: {
                        id: userId,
                        name,
                        email: faker.internet.email({ firstName: name }),
                        password: "password",
                    },
                });
            })
        );
    }

    private seedInventories() {
        return Promise.all(
            this.configs.usersIds.map((userId) => {
                return prisma.inventory.create({
                    data: {
                        name: faker.commerce.department(),
                        userId,
                    },
                });
            })
        );
    }

    private seedCategories(inventories: Array<any>) {
        return Promise.all(
            inventories.map((inv) => {
                return prisma.category.create({
                    data: {
                        name: faker.commerce.productMaterial(),
                        description: faker.helpers.maybe(() =>
                            faker.commerce.productDescription()
                        ),
                        userId: inv.userId,
                        inventoryId: inv.id,
                    },
                });
            })
        );
    }

    private seedProducts(categories: Array<any>) {
        return Promise.all(
            categories.map((category) => {
                const [min, max] = this.configs.productQuantityVariancy;

                return prisma.product.create({
                    data: {
                        name: faker.commerce.product(),
                        quantity: faker.helpers.rangeToNumber({ min, max }),
                        description: faker.commerce.productDescription(),
                        inventoryId: category.inventoryId,
                        categoryId: category.id,
                        userId: category.userId,
                    },
                });
            })
        );
    }
}

new DatabaseSeeder()
    .setConfigs({
        usersIds: ["user1", "user2", "user3"],
        inventoriesPerUser: 4,
        categoriesPerInventory: 5,
        productsPerCategory: 15,
        productQuantityVariancy: [4, 32],
    })
    .seed();
