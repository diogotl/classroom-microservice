import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from 'src/database/database.module';
import { GraphQLModule } from '@nestjs/graphql'; // Import the missing 'GraphQLModule' from the appropriate package.
import path, { join } from 'node:path';
import { ProductsResolver } from './graphql/resolvers/products.resolver';
import { ApolloDriver } from '@nestjs/apollo';
import { ProductsService } from 'src/services/products.service';
import { PurchasesResolver } from './graphql/resolvers/purchases.resolver';
import { PurchasesService } from 'src/services/purchases.service';
import { CustomerService } from 'src/services/customers.service';
import { CustomersResolver } from './graphql/resolvers/customer.resolver';

@Module({
    imports: [
        ConfigModule.forRoot(),
        DatabaseModule,
        GraphQLModule.forRoot({
            driver: ApolloDriver,
            autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        })
    ],
    providers: [
        ProductsResolver,
        PurchasesResolver,
        CustomersResolver,

        ProductsService,
        PurchasesService,
        CustomerService
    ],
})
export class HttpModule { }
