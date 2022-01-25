import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IShift } from './shift.model';

@Injectable()
export class ShiftService {
  constructor(
    @InjectModel('Shift') private readonly shiftModel: Model<IShift>,
  ) {}

  async createShift(shift: IShift, trade: boolean) {
    const newShift = new this.shiftModel(shift);
    newShift.traded = trade;
    await newShift.save();
  }
  async getShifts() {
    const shifts = await this.shiftModel.find().exec();
    return shifts;
  }

  async getShiftsByPersonId(personId) {
    const shiftsByPersonId = await this.shiftModel
      .find({
        shiftPersonId: personId,
      })
      .exec();
    return shiftsByPersonId;
  }

  async getShiftByDate(shiftDate) {
    const shiftByDate = await this.shiftModel
      .findOne({
        shiftDate: shiftDate,
      })
      .exec();
    return shiftByDate;
  }

  async offerShift(id: string) {
    console.log(id);
    return await this.shiftModel.findByIdAndUpdate(id, { traded: true }).exec();
  }

  async getTradedShift(id: string, shiftPerson: string, shiftPersonId: string) {
    return await this.shiftModel
      .findByIdAndUpdate(id, { traded: false, shiftPerson, shiftPersonId })
      .exec();
  }
}
