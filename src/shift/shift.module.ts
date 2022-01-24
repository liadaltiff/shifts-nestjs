import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ShiftController } from './shift.controller';
import { Shift } from './shift.model';
import { ShiftService } from './shift.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Shift', schema: Shift }])],
  providers: [ShiftService],
  controllers: [ShiftController],
})
export class ShiftModule {}
