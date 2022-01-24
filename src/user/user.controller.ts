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
  @Get('getUsers')
  getUsers() {
    return this.usersService.getUsers();
  }

  @Post('login')
  async login(@Body('_id') _id: string, @Body('password') password: string) {
    return await this.usersService.logInUser(_id, password);
  }
}
