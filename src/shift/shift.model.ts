import { ObjectId } from 'mongodb';
import * as mongoose from 'mongoose';

export const Shift = new mongoose.Schema(
  {
    // _id: { type: ObjectId, required: true },
    shiftDate: { type: String, required: true },
    shiftName: { type: String, required: true },
    shiftPerson: { type: String, required: true },
    shiftPersonId: { type: String, required: true },
    startTimeValue: { type: String, required: true },
    endTimeValue: { type: String, required: true },
    traded: { type: Boolean, required: true },
  },
  { versionKey: false },
);

export interface IShift {
  //   _id: ObjectId;
  shiftDate: string;
  shiftName: string;
  shiftPerson: string;
  shiftPersonId: string;
  startTimeValue: string;
  endTimeValue: string;
  traded: boolean;
}
