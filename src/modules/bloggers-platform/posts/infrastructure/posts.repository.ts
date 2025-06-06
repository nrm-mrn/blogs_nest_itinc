import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument, PostModelType } from '../domain/post.entity';
import { DomainExceptionCode } from 'src/core/exceptions/domain-exception-codes';
import { DomainException } from 'src/core/exceptions/domain-exceptions';
import { UpdatePostsByBlog } from '../dto/update-posts-by-blog.dto';

@Injectable()
export class PostsRepository {
  constructor(
    @InjectModel(Post.name) private readonly PostModel: PostModelType,
  ) {}

  async save(post: PostDocument): Promise<string> {
    await post.save();
    return post._id.toString();
  }

  async findById(postId: string): Promise<PostDocument | null> {
    const post = await this.PostModel.findOne({
      _id: postId,
      deletedAt: null,
    });
    return post;
  }

  async findOrNotFoundFail(postId: string): Promise<PostDocument> {
    const post = await this.PostModel.findOne({
      _id: postId,
      deletedAt: null,
    }).orFail(
      new DomainException({
        code: DomainExceptionCode.NotFound,
        message: 'Post not found',
      }),
    );
    return post;
  }

  async updatePostsByBlogId(dto: UpdatePostsByBlog): Promise<void> {
    const res = await this.PostModel.updateMany(
      { blogId: dto.blogId },
      {
        $set: {
          blogName: dto.blogName,
        },
      },
    );
    if (res.acknowledged) {
      return;
    }
    throw new DomainException({
      code: DomainExceptionCode.InternalServerError,
      message: 'Failed to update posts by blog',
    });
  }

  async deletePostsByBlogId(blogId: string): Promise<void> {
    const res = await this.PostModel.deleteMany({ blogId: blogId });
    if (res.acknowledged) {
      return;
    }
    throw new DomainException({
      code: DomainExceptionCode.InternalServerError,
      message: 'Failed to delete posts by blog',
    });
  }

  async deletePost(post: PostDocument) {
    post.markDeleted();
    return this.save(post);
  }
}
