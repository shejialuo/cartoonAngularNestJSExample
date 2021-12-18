import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserRemarkService } from './user-remark.service';

@Controller('user-remark')
export class UserRemarkController {
  constructor(private service: UserRemarkService) {}

  @Get()
  findAll() {
    return this.service.findAll();    
  }


  @Post()
  @UseGuards(AuthGuard('jwt'))
  addRemark(@Req() request:any,
            @Body() remark: string) {
    return this.service.addOne(
      request.user.userName,
      remark,
    );
  }
}
