import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { UsersService } from './users.service';
import { Role } from 'src/common/enums/role.enum';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/common/decorators/get-user.decorator';


@Controller('users')
@UseGuards(AuthGuard())
export class UsersController {
    constructor(private readonly usersService: UsersService) {}
    @Get('')
    getUsers(@Query() role:Role=Role.User):Promise<User[]>{
        return this.usersService.getUsers(role);

    }

    @Get('/getUser')
    getUser(@GetUser() user:User):Promise<User>{
        return this.usersService.getUser(user);
    }

}
