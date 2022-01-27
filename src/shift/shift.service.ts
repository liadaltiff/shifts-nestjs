import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IShift } from './shift.model';

@Injectable()
export class ShiftService {
  constructor(
    @InjectModel('Shift') private readonly shiftModel: Model<IShift>,
  ) {}

  // async createShift(shift: IShift, trade: boolean) {
  //   const newShift = new this.shiftModel(shift);
  //   newShift.traded = trade;
  //   await newShift.save();
  // }

  async createShift(shift: IShift, trade: boolean) {
    // const newShift = this.shiftModel.create()
    shift.traded = trade;
    await this.shiftModel.replaceOne({ shiftDate: shift.shiftDate }, shift, {
      upsert: true,
    });
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
    console.log('vainer stom tape shelchaaaaa');

    const shiftByDate = await this.shiftModel
      .findOne({
        shiftDate: shiftDate,
      })
      .exec();
    return shiftByDate;
  }

  async offerShift(_id: string) {
    console.log('vainer stom tape shelcha');

    console.log(_id);

    return await this.shiftModel
      .findByIdAndUpdate(_id, { traded: true })
      .exec();
  }

  async getTradedShift(id: string, shiftPerson: string, shiftPersonId: string) {
    return await this.shiftModel
      .findByIdAndUpdate(id, { traded: false, shiftPerson, shiftPersonId })
      .exec();
  }
}
