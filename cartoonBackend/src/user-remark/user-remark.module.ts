import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthStrategy } from 'src/auth/auth.strategy';
import { RemarkSchema } from 'src/schema/remark.schema';
import { UserRemarkController } from './user-remark.controller';
import { UserRemarkService } from './user-remark.service';

@Module({
  controllers: [UserRemarkController],
  providers: [UserRemarkService, AuthStrategy],
  imports: [
    MongooseModule.forFeature([
      {name: 'Remark', schema: RemarkSchema}
    ])
  ]
})
export class UserRemarkModule {}
