import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { PostLikeStatus } from '../api/view-dto/posts.view-dto';
import { CreatePostLikeDomainDto } from './dto/create-post-like-domain-dto';
import { HydratedDocument, Model } from 'mongoose';

export enum LikeStatus {
  LIKE = 'Like',
  DISLIKE = 'Dislike',
  NONE = 'None',
}

@Schema({ timestamps: true })
export class PostLike {
  @Prop({ type: String, required: true })
  postId: string;

  @Prop({ type: String, required: true })
  userId: string;

  @Prop({ type: String, required: true })
  login: string;

  @Prop({ type: String, enum: PostLikeStatus, required: true })
  status: PostLikeStatus;

  createdAt: Date;
  updatedAt: Date;

  static createLike(dto: CreatePostLikeDomainDto): PostLikeDocument {
    const like = new this();
    like.postId = dto.postId;
    like.userId = dto.userId;
    like.login = dto.login;
    like.status = dto.status;

    return like as PostLikeDocument;
  }
}

export type PostLikeDocument = HydratedDocument<PostLike>;
export type PostLikeModelType = Model<PostLikeDocument> & typeof PostLike;
export const PostLikeSchema = SchemaFactory.createForClass(PostLike);

PostLikeSchema.loadClass(PostLike);
