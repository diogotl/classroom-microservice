import { ExecutionContext, createParamDecorator } from "@nestjs/common"
import { GqlExecutionContext } from "@nestjs/graphql";

export type AuthUser = {
    sub: string
}

export const CurrentUser = createParamDecorator((data: unknown, ctx: ExecutionContext): AuthUser => {

    const context = GqlExecutionContext.create(ctx);
    const req = context.getContext().req;

    return req.auth;
});