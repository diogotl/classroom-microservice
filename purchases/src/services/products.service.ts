import slugify from 'slugify';
import { PrismaService } from '../database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

type StoreProductParams = {
    title: string;
}

@Injectable()
export class ProductsService {
    constructor(
        private prisma: PrismaService,
    ) { }

    async getProductById(id: string) {
        return this.prisma.product.findUnique({
            where: {
                id,
            },
        });
    }

    async listAllProducts() {
        return this.prisma.product.findMany();
    }

    async store({ title }: StoreProductParams) {
        const slug = slugify(title, {
            lower: true,
        });

        console.log(slug);


        const productWithSameSlug = this.prisma.product.findUnique({
            where: {
                slug,
            },
        });

        console.log(productWithSameSlug);

        if (!productWithSameSlug) {
            throw new Error('Slug already exists');
        }


        const product = await this.prisma.product.create({
            data: {
                title,
                slug,
            }
        });

        console.log(product);

        return product;
    }
}