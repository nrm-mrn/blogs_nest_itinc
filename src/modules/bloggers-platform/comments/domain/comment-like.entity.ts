import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CreateCommentLikeDomainDto } from './dto/create-comment-like-domain-dto';
import { HydratedDocument, Model } from 'mongoose';

export enum CommentLikeStatus {
  LIKE = 'Like',
  DISLIKE = 'Dislike',
  NONE = 'None',
}

@Schema({ timestamps: true })
export class CommentLike {
  @Prop({ type: String, required: true })
  commentId: string;

  @Prop({ type: String, required: true })
  userId: string;

  @Prop({ type: String, enum: CommentLikeStatus, required: true })
  status: CommentLikeStatus;

  createdAt: Date;
  updatedAt: Date;

  static createLike(dto: CreateCommentLikeDomainDto): CommentLikeDocument {
    const like = new this();
    like.commentId = dto.commentId;
    like.userId = dto.userId;
    like.status = dto.status;

    return like as CommentLikeDocument;
  }
}

export type CommentLikeDocument = HydratedDocument<CommentLike>;
export type CommentLikeModelType = Model<CommentLikeDocument> &
  typeof CommentLike;
export const CommentLikeSchema = SchemaFactory.createForClass(CommentLike);

CommentLikeSchema.loadClass(CommentLike);
