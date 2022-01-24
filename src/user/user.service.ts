import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from './user.model';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<IUser>) {}

  async signUpUser(user: IUser) {
    const newUser = new this.userModel(user);
    const res = await newUser.save();
  }
  async getUsers() {
    const users = await this.userModel.find().exec();
    return users;
  }
  async logInUser(id: string, password: string) {
    const findUser = await this.userModel
      .findOne({
        _id: id,
        password: password,
      })
      .exec();
    return findUser;
  }
}
