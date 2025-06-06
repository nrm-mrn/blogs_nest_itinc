import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostModelType } from '../domain/post.entity';
import { GetPostsQueryParams } from '../api/input-dto/get-posts-query-params.input-dto';
import { PaginatedViewDto } from 'src/core/dto/base.paginated.view-dto';
import { PostViewDto } from '../api/view-dto/posts.view-dto';
import { DomainException } from 'src/core/exceptions/domain-exceptions';
import { DomainExceptionCode } from 'src/core/exceptions/domain-exception-codes';

@Injectable()
export class PostsQueryRepository {
  constructor(
    @InjectModel(Post.name) private readonly PostModel: PostModelType,
  ) {}

  async getAllPosts(
    dto: GetPostsQueryParams,
  ): Promise<PaginatedViewDto<PostViewDto[]>> {
    const posts = await this.PostModel.find({})
      .sort({ [dto.sortBy]: dto.sortDirection })
      .skip(dto.calculateSkip())
      .limit(dto.pageSize)
      .exec();
    const total = await this.PostModel.countDocuments().exec();
    const postsView: PostViewDto[] = posts.map((post) => {
      return PostViewDto.mapToView(post);
    });

    return PaginatedViewDto.mapToView({
      items: postsView,
      page: dto.pageNumber,
      size: dto.pageSize,
      totalCount: total,
    });
  }

  async findPostOrNotFoundFail(postId: string): Promise<PostViewDto> {
    const post = await this.PostModel.findOne({
      _id: postId,
      deletedAt: null,
    }).orFail(
      new DomainException({
        code: DomainExceptionCode.NotFound,
        message: 'Post not found',
      }),
    );
    return PostViewDto.mapToView(post);
  }
}
