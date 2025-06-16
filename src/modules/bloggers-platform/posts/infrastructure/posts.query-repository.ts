import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostModelType } from '../domain/post.entity';
import { GetPostsQueryParams } from '../api/input-dto/get-posts-query-params.input-dto';
import { PaginatedViewDto } from 'src/core/dto/base.paginated.view-dto';
import { PostViewDto } from '../api/view-dto/posts.view-dto';
import { DomainException } from 'src/core/exceptions/domain-exceptions';
import { DomainExceptionCode } from 'src/core/exceptions/domain-exception-codes';
import { PostLike, PostLikeModelType } from '../domain/postLike.entity';

@Injectable()
export class PostsQueryRepository {
  constructor(
    @InjectModel(Post.name) private readonly PostModel: PostModelType,
    @InjectModel(PostLike.name)
    private readonly PostLikeModel: PostLikeModelType,
  ) {}

  async getAllPosts(
    dto: GetPostsQueryParams,
    userId?: string,
  ): Promise<PaginatedViewDto<PostViewDto[]>> {
    const posts = await this.PostModel.find({ deletedAt: null })
      .sort({ [dto.sortBy]: dto.sortDirection })
      .skip(dto.calculateSkip())
      .limit(dto.pageSize)
      .exec();
    const total = await this.PostModel.countDocuments().exec();
    const postsView: PostViewDto[] = posts.map((post) => {
      return PostViewDto.mapToView(post);
    });

    if (userId) {
      const postIds = posts.map((postDoc) => postDoc._id.toString());
      const likes = await this.PostLikeModel.find({
        userId,
        postId: { $in: postIds },
      });
      const likesMap = new Map(likes.map((like) => [like.postId, like.status]));
      postsView.forEach((post) => {
        post.setLike(likesMap);
      });
    }

    return PaginatedViewDto.mapToView({
      items: postsView,
      page: dto.pageNumber,
      size: dto.pageSize,
      totalCount: total,
    });
  }

  async findPostOrNotFoundFail(
    postId: string,
    userId?: string,
  ): Promise<PostViewDto> {
    const post = await this.PostModel.findOne({
      _id: postId,
      deletedAt: null,
    }).orFail(
      new DomainException({
        code: DomainExceptionCode.NotFound,
        message: 'Post not found',
      }),
    );
    const postView = PostViewDto.mapToView(post);
    if (userId) {
      const like = await this.PostLikeModel.findOne({
        userId,
        postId,
      });
      if (like) {
        postView.setLike(like);
      }
    }
    return postView;
  }
}
