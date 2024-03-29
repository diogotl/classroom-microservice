import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from 'src/database/database.module';
import { GraphQLModule } from '@nestjs/graphql'; // Import the missing 'GraphQLModule' from the appropriate package.
import path, { join } from 'node:path';
import { ApolloDriver } from '@nestjs/apollo';

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
        Course
    ],
})
export class HttpModule { }
