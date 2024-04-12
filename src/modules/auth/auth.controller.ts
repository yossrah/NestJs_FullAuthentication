import { Body, Controller, Post } from '@nestjs/common';
import { AuthCredentialsDto } from 'src/common/dtos/authCredentials.dto';
import { SignInCredentialsDto } from 'src/common/dtos/signInCredentials.dto';
import { User } from 'src/entities/user.entity';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService ){}
@Post('')
register(@Body() createUserDto:AuthCredentialsDto):Promise<User>{
        return this.authService.register(createUserDto)
    }

@Post('login')
login(@Body() SignInPayload:SignInCredentialsDto):Promise<{accessToken:string}>{
     return this.authService.validateUser(SignInPayload)
}
}

