import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from 'src/dto/user.dto';
import { UserDocument } from 'src/schema/user.schema';

const nodemailer = require('nodemailer');



@Injectable()
export class UserRegisterService {

  isDuplicate: any;

  smtpConfig = {
    host: 'smtp.qq.com',
    port: 465,
    auth: {
        user: '392499367@qq.com',
        pass: '',
    },
  };

  transporter = nodemailer.createTransport(this.smtpConfig);
  
  sendmail(html: string, poster: string){
      const option = {
          from: '392499367@qq.com',
          to: poster,
          subject : 'Cartoon校验码',
          html : html,
      };
      this.transporter.sendMail(option, (error, response) => {
        if (error) {
            console.log('fail:' + error);
        } else {
            console.log('success:' + response.messageID);
        }
    });
  };

  constructor(@InjectModel('User')
    private userModel: Model<UserDocument>) {}

  emailCode = new Map<string, string>();

  emailSender(emailAddress: string){
    const code = this.checkNumber();
    console.log(emailAddress);
    this.emailCode.set(emailAddress, code);
    this.sendmail(`欢迎注册Cartoon,您的验证码为${code}`, emailAddress);
  }

  addUser(userDto: UserDto){
    const newUser = new this.userModel(userDto);
    newUser.save();

  }

  async checkName(name: string) {
    await this.checkNameQuery(name).then(
      result => {this.isDuplicate = result}
    )
    return this.isDuplicate;
  }

  checkNameQuery(name: string) {
    return this.userModel.findOne({userName: name}).exec();
  }

  checkCode(email: string, code: string) {
    if(!this.emailCode.has(email))
      return false;
    if(this.emailCode.get(email) == code) {
      this.emailCode.delete(email);
      return true;
    } else {
      return false;
    }
  }

  checkNumber(): string {
    const str = '0123456789';
    let res = '';
    for (let i = 0; i < 4; i++) {
    const n = Math.floor((Math.random() * str.length));
    res += str [n];
    }
    return res;
  }
}
