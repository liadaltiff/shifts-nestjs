import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IShift } from './shift.model';

@Injectable()
export class ShiftService {
  constructor(
    @InjectModel('Shift') private readonly shiftModel: Model<IShift>,
  ) {}

  async createShift(shift: IShift) {
    const newShift = new this.shiftModel(shift);
    const res = await newShift.save();
  }
  async getShifts() {
    const shifts = await this.shiftModel.find().exec();
    return shifts;
  }
}
