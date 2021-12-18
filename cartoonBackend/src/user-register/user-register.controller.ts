import { Controller, Post, Body } from '@nestjs/common';
import { EmailCode } from 'src/dto/code.dto';
import { UserDto } from 'src/dto/user.dto';
import { UserRegisterService } from './user-register.service';

@Controller('user-register')
export class UserRegisterController {
  constructor(private service: UserRegisterService) {}

  @Post()
  create(@Body() userDto: UserDto) {
    return this.service.addUser(userDto);
  }

  @Post('email')
  email(@Body() emailAddress: string) {
    return this.service.emailSender(emailAddress);
  }

  @Post('solo')
  check(@Body() name: string) {
    return this.service.checkName(name);
  }

  @Post('check')
  checkNum(@Body() emailCode: EmailCode) {
    return this.service.checkCode(
      emailCode.email,
      emailCode.code
    );
  }
}
