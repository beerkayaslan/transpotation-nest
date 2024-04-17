import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false, timestamps: true, })
export class User {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  role: string;

  @Prop({ default: null })
  refreshToken: string;

  @Prop({ required: false, default: [] })
  followers?: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);