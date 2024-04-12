import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { MailingService } from '../mailing/mailing.service';

@Module({
  imports:[
  ConfigModule.forRoot(),
  //provide the strategy
  PassportModule.register({defaultStrategy:'jwt'}),
  //jwtModule setup
  JwtModule.register({
    //secret key to sign the payload for jwt token
    secretOrPrivateKey: process.env.ACESS_SECRET,
    signOptions: { expiresIn: '3600s' },
  }),
  TypeOrmModule.forFeature([User]),
 ],
  providers: [AuthService,
    MailingService,
    ConfigService,
    JwtStrategy
  ],
  controllers: [AuthController],
  //to guard other modules with  PassportModule and JwtStrategy
  exports:[
    JwtStrategy,
    PassportModule
  ]
})
export class AuthModule {}
