import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  Comment,
  CommentDocument,
  CommentModelType,
} from '../domain/comment.entity';
import { DomainException } from 'src/core/exceptions/domain-exceptions';
import { DomainExceptionCode } from 'src/core/exceptions/domain-exception-codes';
import {
  CommentLike,
  CommentLikeDocument,
  CommentLikeModelType,
} from '../domain/comment-like.entity';

@Injectable()
export class CommentsRepository {
  constructor(
    @InjectModel(Comment.name) private readonly CommentModel: CommentModelType,
    @InjectModel(CommentLike.name)
    private readonly CommentLikeModel: CommentLikeModelType,
  ) {}

  async save(doc: CommentDocument | CommentLikeDocument): Promise<string> {
    const savedDoc = await doc.save();
    return savedDoc._id.toString();
  }

  async findCommentByIdOrFail(id: string): Promise<CommentDocument> {
    const comment = await this.CommentModel.findOne({
      _id: id,
      deletedAt: null,
    }).orFail(
      new DomainException({
        code: DomainExceptionCode.NotFound,
        message: 'Comment not found',
      }),
    );
    return comment;
  }

  async deleteComment(comment: CommentDocument): Promise<void> {
    comment.markDeleted();
    await Promise.all([
      this.save(comment),
      this.CommentLikeModel.deleteMany({ commentId: comment._id.toString() }),
    ]);
    return;
  }

  async deleteCommentsByPost(postId: string): Promise<void> {
    const ids = await this.CommentModel.find({ postId }).then((comments) => {
      return comments.map((comment) => comment._id.toString());
    });
    await Promise.all([
      this.CommentModel.updateMany({ postId }, { deletedAt: new Date() }),
      this.CommentLikeModel.deleteMany({ commentId: { $in: ids } }),
    ]);
  }

  async deleteCommentsForPosts(postIds: string[]): Promise<void> {
    const commentIds = await this.CommentModel.find({
      postId: { $in: postIds },
    }).then((comments) => comments.map((comment) => comment._id.toString()));
    await Promise.all([
      this.CommentModel.updateMany(
        {
          postId: { $in: postIds },
        },
        { deletedAt: new Date() },
      ),
      this.deleteCommentsLikes(commentIds),
    ]);
    return;
  }

  private async deleteCommentsLikes(commentIds: string[]) {
    return this.CommentLikeModel.deleteMany({ commentId: { $in: commentIds } });
  }

  async findCommLikeByUser(
    commentId: string,
    userId: string,
  ): Promise<CommentLikeDocument | null> {
    const like = await this.CommentLikeModel.findOne({
      commentId,
      userId,
    }).exec();
    return like;
  }
}
