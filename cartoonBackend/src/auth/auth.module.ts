import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/schema/user.schema';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthStrategy } from './auth.strategy';

@Module({
  controllers: [AuthController],
  imports: [
    JwtModule.register({
      secret: 'shejialuo',
      signOptions: {
        expiresIn: '24h',
      }
    }),
    MongooseModule.forFeature(
      [{name: 'User', schema: UserSchema}]
    )
  ],
  providers: [AuthService, AuthStrategy]
})
export class AuthModule {}
