import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from 'src/common/dtos/authCredentials.dto';
import { SignInCredentialsDto } from 'src/common/dtos/signInCredentials.dto';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'
import { SendEmailDto } from 'src/common/interfaces/email.interface';
import { MailingService } from '../mailing/mailing.service';
import { JwtPayload } from 'src/common/interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
    constructor(@InjectRepository(User) private readonly userRepository:Repository<User>,
    private readonly emailService:MailingService,
    private readonly jwtService:JwtService){}
    private async hashPassword(password: string, salt: string): Promise<string> {//return Promise<string> because it is asyn funct
        return bcrypt.hash(password, salt)
      }
    
    private async validatePassword(password:string,userpassword:string){
        return await bcrypt.compare(password, userpassword);
      }


    async register(createUserDto:AuthCredentialsDto):Promise<User>{
        const {username}=createUserDto
        try{
          const existedUser=await this.userRepository.findOneBy({username})
          if(existedUser){
            throw new ConflictException('Username already exists');
          }
        //generate activation token
        const characters = process.env.CHARACTERS
        let activationToken = "";
        for (let i = 0; i < 25; i++) {
          activationToken += characters[Math.floor(Math.random() * characters.length)]
         }
        //generate salt 
        const salt=await bcrypt.genSalt()
        //console.log(salt)
        const newUser = this.userRepository.create({
          ...createUserDto,
          CreatedAt: new Date(),
          isActive: false,
          activationToken: activationToken
        })
        //hash user password
        newUser.password= await this.hashPassword(newUser.password, salt)

        // Send activation email to the user
        const dto: SendEmailDto = {
          from: process.env.SMTP_USERNAME,
          to: username,
          subject: 'Confirm your account',
          html: `<div>
                  <h1>Confirmation email</h1>
                  <h2>Good morning</h2>
                  <p>To activate your account, click this link:</p>
                  <a href="http://localhost:${process.env.PORT}/auth/confirm/${activationToken}">Click here!</a>
              </div>`
        }
        await this.emailService.sendEmail(dto);
        //save user to db
        return await this.userRepository.save(newUser);
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

    async validateUser({username,password}:SignInCredentialsDto):Promise<{accessToken:string}>{
      const existingUser = await this.userRepository.findOneBy({ username });
      if (!existingUser) {
        throw new ConflictException('unvalid credentials');
       }
  // Compare the provided password with the hashed password stored in the database
     const isPasswordValid =await this.validatePassword(password, existingUser.password);
     if (!isPasswordValid) {
       throw new UnauthorizedException('Invalid credentials');
    }
    //extract the payload structure into an interface
    const payload:JwtPayload= { username: existingUser.username, id: existingUser.id, role: existingUser.role };
    const accessToken = await this.jwtService.sign(payload);
    return {accessToken}  
    }
  }
