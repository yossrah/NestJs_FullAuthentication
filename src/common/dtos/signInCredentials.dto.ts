import { IsEmail, IsNotEmpty } from "class-validator";

export class SignInCredentialsDto {
    @IsEmail()
    username:string

    @IsNotEmpty()
    password:string
}