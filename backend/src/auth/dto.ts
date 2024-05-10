import { InputType, Field } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, MinLength, IsString } from "class-validator";

@InputType()
export class RegisterDto {
    @Field()
    @IsNotEmpty({ message: 'Fullname is required.'})
    fullname: string;

    @Field()
    @IsNotEmpty({ message: 'Password is required.'})
    @MinLength(8, { message: 'Password must be at least 8 characters.'})
    password: string;

    //configure password must be the as password

    @Field()
    @IsNotEmpty({ message: 'Confirm password is required.'})
    // must be the same as password
    confirmPassword: string;

    @Field()
    @IsNotEmpty({ message: 'Email is required.'})
    @IsEmail({}, { message: 'Email must be valid.'})
    email: string;
}

@InputType()
export class LoginDto {
    @Field()
    @IsNotEmpty({ message: 'Email is required.'})
    @IsEmail({}, { message: 'Email must be valid.'})
    email: string;

    @Field()
    @IsNotEmpty({ message: 'Password is required.'})
    password: string;
}