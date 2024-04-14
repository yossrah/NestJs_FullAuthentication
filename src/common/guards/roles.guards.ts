import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";

@Injectable()
//implements CanActivate interface
export class RolesGuard implements CanActivate{
  constructor(private reflector: Reflector) {}
//The canActivate method takes an ExecutionContext argument and should return a boolean value that indicates whether the route can be accessed.
//ExecutionContext allows you to get access to a bunch of metadata as well as the request and response object
   
canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    // get the roles required
    const roles = this.reflector.getAllAndOverride<string[]>('roles', [context.getHandler(), context.getClass()]);
    if (!roles) {
      return false;
    }
    const request = context.switchToHttp().getRequest();
    const userRoles = request.user?.role?.split(',');
    return this.validateRoles(roles, userRoles);
  }
  validateRoles(roles: string[], userRoles: string[]) {
    return roles.some(role => userRoles.includes(role));
  }
}