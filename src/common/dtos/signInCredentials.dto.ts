import { IsEmail, IsNotEmpty } from "class-validator";

export class SignInCredentials {
    @IsEmail()
    username:string

    @IsNotEmpty()
    password:string
}