import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common"
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { AuthGuard } from "@nestjs/passport";
import { JwtStrategy } from "src/modules/auth/strategies/jwt.strategy";

@Injectable()
//implements CanActivate interface
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private jwtStrategy:JwtStrategy, private reflector:Reflector){
      super()
    }
    //ExecutionContext allows you to get access to a bunch of metadata as well as the request and response object
    async canActivate(context: ExecutionContext): Promise<boolean>  {
    
      //canActivate returns a boolean or promise boolean it can be async or an obsorvable boolean
      await super.canActivate(context);
      const request=context.switchToHttp().getRequest()
      const user=await this.jwtStrategy.validate(request.user)
      console.log('useeeeer',user)
      request.user=user
      return true
  }
}