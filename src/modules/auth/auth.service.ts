import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from 'src/common/dtos/authCredentials.dto';
import { SignInCredentials } from 'src/common/dtos/signInCredentials.dto';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'
@Injectable()
export class AuthService {
    constructor(@InjectRepository(User) private readonly userRepository:Repository<User>,){}
    private async hashPassword(password: string, salt: string): Promise<string> {//return Promise<string> because it is asyn funct
        return bcrypt.hash(password, salt)
      }
    
    async register(createUserDto:AuthCredentialsDto):Promise<User>{
        const {username}=createUserDto
        try{
          const existedUser=this.userRepository.findOneBy({username})
          if(existedUser){
            throw new ConflictException('Username already exists');
          }
        }
        catch(error){
            if (error instanceof ConflictException) {
                throw error; // Rethrow conflict exception
              } 
              else {
                // Handle other exceptions (e.g., database error)
                throw new InternalServerErrorException('Failed to create user');
              }
        }



    }
    async validateUser(SignInPayload:SignInCredentials):Promise<{accessToken:string}>{

    }
}
