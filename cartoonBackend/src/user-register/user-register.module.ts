import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/schema/user.schema';
import { UserRegisterController } from './user-register.controller';
import { UserRegisterService } from './user-register.service';

@Module({
  providers: [UserRegisterService],
  controllers: [UserRegisterController],
  imports: [
    MongooseModule.forFeature(
      [{name: 'User', schema: UserSchema}]
    )
  ]
})
export class UserRegisterModule {}
