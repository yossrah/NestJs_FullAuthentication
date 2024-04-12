import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { JwtPayload } from "src/common/interfaces/jwt-payload.interface";
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";
import {Strategy,ExtractJwt} from "passport-jwt"
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(@InjectRepository(User) private readonly userRepository:Repository<User>){
        super({
        //retrieve the jwt token from the request
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey: process.env.ACESS_SECRET})
    }

    async validate(payload: JwtPayload): Promise<User> {
        const {id, role } = payload
        const user = await this.userRepository.findOneBy( {id} )
        if (!user) {
            throw new UnauthorizedException();
        }
        //user.role=role
        return user
    }

}