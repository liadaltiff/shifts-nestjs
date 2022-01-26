import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { createToken } from 'src/guards/auth.guard';
import { Response } from 'express';
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
  async login(
    @Body('_id') _id: string,
    @Body('password') password: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    // return await this.usersService.logInUser(_id, password);
    const user = await this.usersService.logInUser(_id, password);
    user.password = undefined;
    const token = await createToken(user);
    res.cookie('token', token, {
      sameSite: 'lax',
      secure: process.env.NODE_ENV ? true : false,
      httpOnly: process.env.NODE_ENV ? true : false,
      expires: new Date(new Date().getTime() + 4 * 60 * 60 * 1000),
    });
    return user;
  }
}
