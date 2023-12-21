import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ProductsService } from 'src/services/products.service';
import { CreateProductInput } from '../inputs/create-product-input';
import { Product } from '../models/product';
import { AuthorizationGuard } from 'src/http/authorization/authorization.guard';
import { UseGuards } from '@nestjs/common';
import { Customer } from '../models/customer';
import { CustomerService } from 'src/services/customers.service';
import { AuthUser, CurrentUser } from 'src/http/authorization/current-user';
import { defineDmmfProperty } from '@prisma/client/runtime/library';
import { PurchasesService } from 'src/services/purchases.service';

@Resolver(() => Customer)
export class CustomersResolver {

    constructor(
        private customersService: CustomerService,
        private purchasesService: PurchasesService
    ) { }

    @Query(() => Customer)
    @UseGuards(AuthorizationGuard)
    async me(
        @CurrentUser() user: AuthUser,
    ) {
        console.log(user.sub);
        const customer = await this.customersService.getCustomerById(user.sub);

        console.log(customer);

        return customer;
    }

    @ResolveField()
    purchases(
        @Parent() customer: Customer
    ) {
        return this.purchasesService.listByCustomerId(customer.id);
    }
}
