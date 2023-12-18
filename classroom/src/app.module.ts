import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { HttpModule } from './http/http.module';
import { PrismaService } from './database/prisma/prisma.service';


@Module({
    imports: [DatabaseModule, HttpModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
