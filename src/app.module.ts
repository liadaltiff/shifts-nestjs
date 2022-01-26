import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShiftModule } from './shift/shift.module';
import { UserModule } from './user/user.module';
import { NotificationGateway } from './utils/notification.gateway';

@Module({
  imports: [
    UserModule,
    ShiftModule,
    MongooseModule.forRoot(
      'mongodb+srv://user:1234@cluster0.9dkgd.mongodb.net/shiftsDB?retryWrites=true&w=majority',
    ),
  ],
  controllers: [AppController],
  providers: [AppService, NotificationGateway],
})
export class AppModule {}
