import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  CommentatorInfo,
  CommentatorInfoSchema,
} from './commentator-info.schema';
import { CreateCommentDomainDto } from './dto/create-comment-domain-dto';
import { HydratedDocument, Model } from 'mongoose';
import { UpdateCommentDomainDto } from './dto/update-comment-domain-dto';
import { DomainException } from 'src/core/exceptions/domain-exceptions';
import { DomainExceptionCode } from 'src/core/exceptions/domain-exception-codes';

export const commentContentConstr = {
  minLength: 20,
  maxLength: 300,
};

@Schema({ timestamps: true })
export class Comment {
  @Prop({ type: String, required: true })
  postId: string;

  @Prop({ type: String, required: true, ...commentContentConstr })
  content: string;

  @Prop({ type: CommentatorInfoSchema, required: true })
  commentatorInfo: CommentatorInfo;

  @Prop({ type: Number, default: 0 })
  likesCount: number;

  @Prop({ type: Number, default: 0 })
  dislikesCount: number;

  createdAt: Date;

  @Prop({ type: Date, nullable: true, default: null })
  deletedAt: Date;

  static createComment(dto: CreateCommentDomainDto): CommentDocument {
    const comment = new this();
    comment.postId = dto.postId;
    comment.content = dto.content;
    comment.commentatorInfo = {
      userId: dto.userId,
      userLogin: dto.userLogin,
    };
    comment.likesCount = 0;
    comment.dislikesCount = 0;

    return comment as CommentDocument;
  }

  updateComment(dto: UpdateCommentDomainDto) {
    this.content = dto.content;
  }

  addLike() {
    this.likesCount += 1;
  }

  removeLike() {
    this.likesCount -= 1;
  }

  addDislike() {
    this.dislikesCount += 1;
  }

  removeDislike() {
    this.dislikesCount -= 1;
  }

  markDeleted() {
    if (this.deletedAt !== null) {
      throw new DomainException({
        code: DomainExceptionCode.NotFound,
        message: 'Entity is already deleted',
      });
    }
    this.deletedAt = new Date();
  }
}

export type CommentDocument = HydratedDocument<Comment>;
export type CommentModelType = Model<CommentDocument> & typeof Comment;
export const CommentSchema = SchemaFactory.createForClass(Comment);

CommentSchema.loadClass(Comment);
