import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/user.type';

@ObjectType()
export class RegisterResponse {
    @Field(() => User, { nullable: true}) //Accessing user is another ObjectType you have
    user?: User;
}

export class LoginResponse {
    @Field(() => User)
    user: User;
}