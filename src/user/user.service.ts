import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { comparePasswords, encodePassword } from 'src/utils/bcrypt';
import { IUser } from './user.model';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<IUser>) {}

  async signUpUser(user: IUser) {
    const password = encodePassword(user.password);
    const newUser = new this.userModel({ ...user, password: password });
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
      })
      .exec();
    if (findUser) {
      const matched = comparePasswords(password, findUser.password);
      if (matched) {
        console.log('User Validation Success!');

        return findUser;
      } else {
        console.log('Passwords do not match');

        return null;
      }
    }
    console.log('User Validation Failed!');

    return null;
  }
}
