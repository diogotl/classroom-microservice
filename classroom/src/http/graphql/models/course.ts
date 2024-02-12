import { Field, ID } from "@nestjs/graphql";

export class Course {

    @Field(() => ID)
    id: string;

    @Field()
    title: string;

    @Field(() => String)
    slug: string;
}