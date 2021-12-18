import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Remark } from 'src/schema/remark.schema';

@Injectable()
export class UserRemarkService {

  findAllQuery() {
    return this.remarkModel.find().exec();
  }

  constructor(@InjectModel('Remark')
    private readonly remarkModel: Model<Remark>) {}

  async findAll() {
    let information;
    await this.findAllQuery().then((docs) => {
      information = docs;
    })
    return information;
  }

  addOne(userName: string, userRemark: string) {
    return this.remarkModel.create({
      userName: userName,
      userRemark: userRemark
    });
  }
}
