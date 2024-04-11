import { IsEmail, IsEnum, IsInt, IsNotEmpty, Matches } from "class-validator";
import { Role } from "../enums/role.enum";

const passwordRegEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
export class AuthCredentialsDto{

    @IsEmail()
    username:string

    @IsInt()
    phone: number

    @IsNotEmpty()
    @Matches(passwordRegEx,{
        message: `Password must contain Minimum 6 and maximum 20 characters, 
        at least one uppercase letter, 
        one lowercase letter, 
        one number and 
        one special character`,
      })
    password:string

    isActive:boolean

    @IsNotEmpty()
    //@IsEnum(Role)
    role:Role



}