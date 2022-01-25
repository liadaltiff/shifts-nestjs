import { Body, Controller, Get, Post } from '@nestjs/common';
import { IUser } from './user.model';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post('createUser')
  async signUpUser(@Body() signUpUser: IUser) {
    await this.usersService.signUpUser(signUpUser);
  }
  @Get('getUsers')
  async getUsers() {
    return await this.usersService.getUsers();
  }

  @Post('login')
  async login(@Body('_id') _id: string, @Body('password') password: string) {
    return await this.usersService.logInUser(_id, password);
  }
}
