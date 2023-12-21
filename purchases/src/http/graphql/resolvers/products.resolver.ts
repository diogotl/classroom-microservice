import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductsService } from 'src/services/products.service';
import { CreateProductInput } from '../inputs/create-product-input';
import { Product } from '../models/product';
import { AuthorizationGuard } from 'src/http/authorization/authorization.guard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => Product)
export class ProductsResolver {

    constructor(private productsService: ProductsService) { }


    @Query(() => [Product])
    @UseGuards(AuthorizationGuard)
    async list() {
        return this.productsService.listAllProducts();
    }

    @Mutation(() => Product)
    @UseGuards(AuthorizationGuard)
    async store(
        @Args('data') data: CreateProductInput,
    ) {
        return this.productsService.store(data);
    }
}
