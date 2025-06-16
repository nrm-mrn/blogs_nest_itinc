import { Injectable } from '@nestjs/common';
import { PaginatedViewDto } from 'src/core/dto/base.paginated.view-dto';
import { CommentViewDto } from '../api/view-dto/comment-view.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Comment, CommentModelType } from '../domain/comment.entity';
import {
  CommentLike,
  CommentLikeModelType,
} from '../domain/comment-like.entity';
import { DomainException } from 'src/core/exceptions/domain-exceptions';
import { DomainExceptionCode } from 'src/core/exceptions/domain-exception-codes';
import { GetCommentsForPostQueryDto } from '../dto/get-comments-for-post.dto';
import { GetCommentDto } from '../dto/get-comment-dto';

@Injectable()
export class CommentsQueryRepository {
  constructor(
    @InjectModel(Comment.name) private readonly CommentModel: CommentModelType,
    @InjectModel(CommentLike.name)
    private readonly CommentLikeModel: CommentLikeModelType,
  ) {}

  async getCommentsForPost(
    dto: GetCommentsForPostQueryDto,
  ): Promise<PaginatedViewDto<CommentViewDto[]>> {
    const filter = {
      postId: dto.postId,
      deletedAt: null,
    };
    const comments = await this.CommentModel.find(filter)
      .sort({ [dto.query.sortBy]: dto.query.sortDirection })
      .skip(dto.query.calculateSkip())
      .limit(dto.query.pageSize)
      .exec();
    const total = await this.CommentModel.countDocuments(filter).exec();
    const commentsView = comments.map((comment) =>
      CommentViewDto.mapToView(comment),
    );
    if (dto.userId) {
      const commentIds = comments.map((commentDoc) =>
        commentDoc._id.toString(),
      );
      const likes = await this.CommentLikeModel.find({
        userId: dto.userId,
        commentId: { $in: commentIds },
      });
      const likesMap = new Map(
        likes.map((like) => [like.commentId, like.status]),
      );
      commentsView.forEach((comment) => comment.setLike(likesMap));
    }

    return PaginatedViewDto.mapToView({
      items: commentsView,
      page: dto.query.pageNumber,
      size: dto.query.pageSize,
      totalCount: total,
    });
  }

  async findCommentOrNotFoundFail(dto: GetCommentDto): Promise<CommentViewDto> {
    const comment = await this.CommentModel.findOne({
      _id: dto.commentId,
      deletedAt: null,
    }).orFail(
      new DomainException({
        code: DomainExceptionCode.NotFound,
        message: 'Comment not found',
      }),
    );
    const commentView = CommentViewDto.mapToView(comment);

    if (dto.userId) {
      const like = await this.CommentLikeModel.findOne({
        commentId: dto.commentId,
        userId: dto.userId,
      });
      if (like) {
        commentView.setLike(like);
      }
    }
    return commentView;
  }
}
