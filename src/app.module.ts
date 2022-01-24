import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShiftModule } from './shift/shift.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    UserModule,
    ShiftModule,
    MongooseModule.forRoot(
      'mongodb+srv://user:1234@cluster0.9dkgd.mongodb.net/shiftsDB?retryWrites=true&w=majority',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
