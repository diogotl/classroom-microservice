import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { AuthorizationGuard } from 'src/http/authorization/authorization.guard';
import { Purchase } from '../models/purchase';
import { PurchasesService } from 'src/services/purchases.service';
import { Product } from '../models/product';
import { ProductsService } from 'src/services/products.service';
import { CreatePurchaseInput } from '../inputs/create-purchase-input';
import { AuthUser, CurrentUser } from 'src/http/authorization/current-user';
import { CustomerService } from 'src/services/customers.service';

@Resolver(() => Purchase)
export class PurchasesResolver {

    constructor(
        private purchasesService: PurchasesService,
        private productsService: ProductsService,
        private customerService: CustomerService
    ) { }

    @Query(() => [Purchase])
    @UseGuards(AuthorizationGuard)
    async list() {
        return this.purchasesService.list();
    }

    @ResolveField(() => Product)
    product(
        @Parent() purchase: Purchase
    ) {
        return this.productsService.getProductById(purchase.productId);
    }

    @Mutation(() => Purchase)
    @UseGuards(AuthorizationGuard)
    async storePurchase(
        @CurrentUser() user: AuthUser,
        @Args('data') data: CreatePurchaseInput
    ) {
        console.log(user);
        let customer = await this.customerService.getCustomerById(user.sub);

        console.log(customer);

        if (!customer) {
            // throw new Error('Customer not found');
            customer = await this.customerService.createCustomer({
                authUserId: user.sub
            });
        }

        return await this.purchasesService.create({
            customerId: customer.id,
            productId: data.productId
        });
    }
}
