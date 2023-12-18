import { Controller, Get, UseGuards } from '@nestjs/common';
import { Query } from '@nestjs/graphql';
import { QueryTypeFactory } from '@nestjs/graphql/dist/schema-builder/factories/query-type.factory';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { AuthorizationGuard } from 'src/http/authorization/authorization.guard';

@Controller('test')
export class TestResolver {

    constructor(
        private prisma: PrismaService,
    ) { }


    @Query(() => String)
    // @UseGuards(AuthorizationGuard)
    async test() {
        return 'hello'
    }
}
