import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type RemarkDocument = Remark & Document

@Schema()
export class Remark {
  @Prop({ required: true })
  userName: string;

  @Prop({ required: true })
  userRemark: string;

}

export const RemarkSchema = SchemaFactory.createForClass(Remark);