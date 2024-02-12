import { Resolver } from "@nestjs/graphql";
import { Enrollment } from "../models/enrollment";
import { Student } from "../models/student";

@Resolver(() => Student)
export class StudentsResolver { }