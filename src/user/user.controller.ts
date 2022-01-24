import { Body, Controller, Get, Post } from '@nestjs/common';
import { IUser } from './user.model';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post('createUser')
  signUpUser(@Body() signUpUser: IUser) {
    const newUser = signUpUser as IUser;
    this.usersService.signUpUser(newUser);
  }
  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }
}
