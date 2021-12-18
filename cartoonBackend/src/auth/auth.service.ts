import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginDto } from 'src/dto/login.dto';
import { User } from 'src/schema/user.schema';

@Injectable()
export class AuthService {
  userLoginQuery(loginDto: LoginDto) {
    return this.userModel.findOne(
      {userName: loginDto.userName,
       userPassword: loginDto.userPassword}
    );
  }

  constructor(@InjectModel('User')
  private readonly userModel: Model<User>) {}

  async userLogin(loginDto: LoginDto) {
    let flag;
    await this.userLoginQuery(loginDto).then(
      result => {flag = result}
    );
    return Boolean(flag);
  }
}
