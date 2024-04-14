import { Reflector } from "@nestjs/core";
import { Role } from "../enums/role.enum";
import { SetMetadata } from "@nestjs/common";

//create a roles decorator
//export const Roles = Reflector.createDecorator<Role>();
//@SetMetadata decorator is provided to attach metadata to a class or method. It stores the metadata as a key-value pair.
//In the above code, the key is roles, and the value is passed from the roles argument. The saved metadata can be used by the role guard later.
export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);