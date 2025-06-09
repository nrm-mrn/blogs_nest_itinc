import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { LikeDetails, LikeDetailsSchema } from './likeDetails.schema';

@Schema({ _id: false })
export class ExtendedLikesInfo {
  @Prop({ type: Number, required: true, default: 0 })
  likesCount: number;

  @Prop({ type: Number, required: true, default: 0 })
  dislikesCount: number;

  @Prop({ type: [LikeDetailsSchema], required: true, default: [] })
  newestLikes: LikeDetails[];

  constructor() {
    this.likesCount = 0;
    this.dislikesCount = 0;
    this.newestLikes = [];
  }
}

export const ExtendedLikesInfoSchema =
  SchemaFactory.createForClass(ExtendedLikesInfo);
