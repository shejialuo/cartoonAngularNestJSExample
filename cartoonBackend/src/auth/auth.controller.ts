import { Body, Controller, Post, Req, Res, UseGuards} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from 'src/dto/login.dto';
import { FastifyReply, FastifyRequest } from "fastify";
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
@Controller('auth')
export class AuthController {

  constructor(private jwtService: JwtService,
              private authService: AuthService) {}

  @Post('login')
  async login(@Res({passthrough: true}) 
        response: FastifyReply ,
        @Body() loginDto: LoginDto) {
    let loginSuccess = await this.authService.userLogin(loginDto);

    if(!loginSuccess) {
      response.send({success: false});
    } 
    else {
      const userId = loginDto.userName;
      const payload = {userId: userId};
      const token = this.jwtService.sign(payload);
      response.send({
        success: true,
        jwtToken: token});
    }
  }

  @Post('session')
  @UseGuards(AuthGuard('jwt'))
  sessionLogin(@Req() request: any) {
    return true;
  }
}