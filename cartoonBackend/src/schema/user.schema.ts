import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type UserDocument = User & Document

@Schema()
export class User {
  @Prop({ required: true })
  userName: string;

  @Prop({ required: true })
  userPassword: string;

  @Prop({ required: true })
  userEmail: string;
}

export const UserSchema = SchemaFactory.createForClass(User);