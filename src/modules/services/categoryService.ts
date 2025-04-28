import { CategoryRequestDTO, ProductRequestDTO } from "../dto";
import { prisma } from "../../libs/prisma";
import { ConflictError, ValidationErr, NotFoundError } from "../utils/apiError";
import { PdfUtil } from "../utils/pdfGenerator";

export class CategoryService {
    static async create(data: CategoryRequestDTO, userId: string) {
        if (!data.name || !data.inventoryId) {
            throw new ValidationErr("Name and inventoryId are required");
        }

        const inventory = await prisma.inventory.findFirst({
            where: {
                id: data.inventoryId,
            },
        });

        if (!inventory) {
            throw new NotFoundError(
                "Inventory not found or does not belong to the user"
            );
        }

        const exists = await prisma.category.findFirst({
            where: {
                name: data.name,
                inventoryId: data.inventoryId,
            },
        });

        if (exists) {
            throw new ConflictError("Category already exists");
        }

        return await prisma.category.create({
            data: {
                ...data,
                userId,
                updateAt: new Date(),
            },
        });
    }

    static async generatePdf(categoryId: string, orderBy: string, order: "asc" | "desc") {
    	const category = await prisma.category.findUnique({
        	where: { id: categoryId },
    	});

    	if (!category) {
        	throw new NotFoundError("Category not found");
    	}

    	const products = await prisma.product.findMany({
        	where: { categoryId },
        	orderBy: { [orderBy]: order },
    	});

        console.log(products);

    	if (products.length === 0) {
        	throw new NotFoundError("No products found for this category");
    	}

    	const docDefinition = {
            content: [
                {
                    columns: [
                        {
                            text: `Relatório de Produtos na Categoria: ${category.name}`,
                            style: 'header',
                            alignment: 'center',
                            width: '*',
                        },
                        {
                            image: 'src/assets/logo.png',
                            width: 40, 
                            alignment: 'right',
                        },
                    ],
                },
                {
                    text: '\n',
                },
                {
                    table: {
                        headerRows: 1,
                        widths: ['*', '*', '*'],
                        body: [
                            [
                                { text: 'Nome', style: 'tableHeader' },
                                { text: 'Quantidade', style: 'tableHeader' },
                                { text: 'Código SEDUC', style: 'tableHeader' },
                            ],
                            ...products.map((product: ProductRequestDTO) => [
                                product.name,
                                product.quantity.toString(),
                                product.seducCode || 'N/A',
                            ]),
                        ],
                    },
                    layout: 'lightHorizontalLines',
                },
            ],
            styles: {
                header: {
                    fontSize: 18,
                    bold: true,
                    margin: [0, 0, 0, 10],
                },
                tableHeader: {
                    bold: true,
                    fontSize: 12,
                    color: 'white',
                    fillColor: '#4CAF50',
                    alignment: 'center',
                },
            },
            defaultStyle: {
                font: 'Roboto',
                fontSize: 10,
            },
        };

    	return PdfUtil.generatePdf(docDefinition);
	}

    static async getByUserId(userId: string) {
        return await prisma.category.findMany({
            where: {
                userId,
            },
        });
    }

    static async getProducts(categoryId: string) {
        return await prisma.product.findMany({
            where: {
                categoryId,
            },
        });
    }

    static async getById(id: string) {
        const category = await prisma.category.findFirst({
            where: {
                id,
            },
        });

        if (!category) {
            throw new NotFoundError("Category does not exist");
        }

        return category;
    }

    static async update(id: string, data: CategoryRequestDTO) {
        const category = await prisma.category.findFirst({
            where: {
                id,
            },
        });

        if (!category) {
            throw new NotFoundError(
                "Category does not exist or does not belong to user"
            );
        }

        return await prisma.category.update({
            where: {
                id,
            },
            data: {
                name: data.name,
                description: data.description,
                updateAt: new Date(),
            },
        });
    }

    static async delete(id: string) {
        const category = await prisma.category.findFirst({
            where: {
                id,
            },
        });

        if (!category) {
            throw new NotFoundError("Category does not exist");
        }

        return await prisma.category.delete({
            where: {
                id,
            },
        });
    }
}
