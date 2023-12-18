import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GqlExecutionContext } from '@nestjs/graphql';
// import { expressjwt } from 'express-jwt';
import { GetVerificationKey, expressjwt } from 'express-jwt';
import { expressJwtSecret } from 'jwks-rsa';
import { promisify } from 'node:util';

@Injectable()
export class AuthorizationGuard implements CanActivate {
    private AUTH0_AUDIENCE: string;
    private AUTH0_DOMAIN: string;

    constructor(
        private configService: ConfigService,
    ) {
        this.AUTH0_AUDIENCE = this.configService.get<string>('AUTH0_AUDIENCE') ?? '';
        this.AUTH0_DOMAIN = this.configService.get<string>('AUTH0_DOMAIN') ?? '';
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {

        const { request, response } = GqlExecutionContext.create(context).getContext();

        const checkJwt = promisify(expressjwt({
            algorithms: ['RS256'],
            audience: this.AUTH0_AUDIENCE,
            issuer: this.AUTH0_DOMAIN,
            secret: expressJwtSecret({
                cache: true,
                jwksRequestsPerMinute: 5,
                jwksUri: `${this.AUTH0_DOMAIN}.well-known/jwks.json`,
                rateLimit: true,
            }) as GetVerificationKey,
        }));

        try {
            await checkJwt(request, response)

            return true
        } catch {
            throw new UnauthorizedException();
        }

        // return true;
    }
}
