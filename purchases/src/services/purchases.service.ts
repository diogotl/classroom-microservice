import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma/prisma.service";

type CreateParams = {
    customerId: string
    productId: string
}

@Injectable()
export class PurchasesService {

    constructor(private prisma: PrismaService) { }

    async list() {
        return await this.prisma.purchase.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });
    }

    async listByCustomerId(customerId: string) {
        return await this.prisma.purchase.findMany({
            where: {
                customerId
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
    }

    async create({ customerId, productId }: CreateParams) {

        const product = await this.prisma.product.findUnique({
            where: {
                id: productId
            }
        });

        if (!product) {
            throw new Error('Product not found');
        }

        // const customer = await this.prisma.customer.findUnique({
        //     where: {
        //         id: customerId
        //     }
        // });

        // if (!customer) {
        //     throw new Error('Customer not found');
        // }

        return await this.prisma.purchase.create({
            data: {
                customerId,
                productId
            }
        });
    }

}