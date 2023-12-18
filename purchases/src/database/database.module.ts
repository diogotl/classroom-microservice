import { Module } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from './prisma/prisma.service';

@Module({
    providers: [PrismaService],
    exports: [PrismaService],
})
export class DatabaseModule { }
