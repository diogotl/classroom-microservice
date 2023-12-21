import { PrismaService } from '../database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

type CreateCustomerParams = {
    authUserId: string

}

@Injectable()
export class CustomerService {
    constructor(
        private prisma: PrismaService,
    ) { }

    async getCustomerById(authUserId: string) {

        console.log(authUserId);

        const me = await this.prisma.customer.findUnique({
            where: {
                authUserId: authUserId
            }
        });

        console.log(me);

        return me;
    }


    async createCustomer({ authUserId }: CreateCustomerParams) {

        const user = await this.prisma.customer.create({
            data: {
                authUserId
            }
        });

        return user;
    }
}