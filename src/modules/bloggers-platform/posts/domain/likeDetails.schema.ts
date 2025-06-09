import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export class LikeDetails {
  @Prop({ type: String, required: true })
  addedAt: string;

  @Prop({ type: String, required: true })
  userId: string;

  @Prop({ type: String, required: true })
  login: string;

  constructor(createdAt: Date, userId: string, login: string) {
    this.addedAt = createdAt.toISOString();
    this.userId = userId;
    this.login = login;
  }
}

export const LikeDetailsSchema = SchemaFactory.createForClass(LikeDetails);
