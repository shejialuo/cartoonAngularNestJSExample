import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { UserRegisterController } from './user-register/user-register.controller';
import { UserRegisterModule } from './user-register/user-register.module';
import { AuthModule } from './auth/auth.module';
import { UserRemarkController } from './user-remark/user-remark.controller';
import { UserRemarkModule } from './user-remark/user-remark.module';

@Module({
  imports: [MongooseModule.forRoot(
    'mongodb://127.0.0.1:27017/web'
  ), UserRegisterModule, AuthModule, UserRemarkModule],
  controllers: [],
})
export class AppModule {}
