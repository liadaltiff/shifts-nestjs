import { Body, Controller, Get, Post } from '@nestjs/common';
import { IShift } from './shift.model';
import { ShiftService } from './shift.service';

@Controller('shifts')
export class ShiftController {
  constructor(private readonly shiftsService: ShiftService) {}

  @Post('createShift')
  createShift(@Body() createShift: IShift) {
    const newShift = createShift as IShift;
    this.shiftsService.createShift(newShift);
  }
  @Get('getShifts')
  getShifts() {
    return this.shiftsService.getShifts();
  }
}
