import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { IShift } from './shift.model';
import { ShiftService } from './shift.service';

@UseGuards(AuthGuard)
@Controller('shifts')
export class ShiftController {
  constructor(private readonly shiftsService: ShiftService) {}

  @Post('createShift')
  createShift(
    @Body('parseDetails') parseDetails: IShift,
    @Body('trade') trade: boolean,
  ) {
    this.shiftsService.createShift(parseDetails, trade);
  }

  @Get('getShifts')
  getShifts() {
    return this.shiftsService.getShifts();
  }

  @Get('getShiftsByPersonId/:personId')
  getShiftsByPersonId(@Param() params) {
    return this.shiftsService.getShiftsByPersonId(params.personId);
  }

  @Get('getShiftByDate/:shiftDate')
  getShiftByDate(@Param() params) {
    return this.shiftsService.getShiftByDate(params.shiftDate);
  }

  @Patch('offerShift/:id')
  offerShift(@Param('id') id: string) {
    //@HttpCode(204)
    this.shiftsService.offerShift(id);
  }

  @Put('getTradedShift/:id')
  getTradedShift(
    @Param('id') id: string,
    @Body('shiftPerson') shiftPerson: string,
    @Body('shiftPersonId') shiftPersonId: string,
  ) {
    this.shiftsService.getTradedShift(id, shiftPerson, shiftPersonId);
  }
}
