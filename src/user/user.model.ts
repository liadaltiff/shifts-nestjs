import { ObjectId } from 'mongodb';
import * as mongoose from 'mongoose';

export const User = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    fullName: { type: String, required: true },
    role: { type: String, required: true },
    password: { type: String, required: false },
  },
  { versionKey: false },
);

export interface IUser {
  _id: string;
  fullName: string;
  role: string;
  password?: string;
}
