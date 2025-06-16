import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument, PostModelType } from '../domain/post.entity';
import { DomainExceptionCode } from 'src/core/exceptions/domain-exception-codes';
import { DomainException } from 'src/core/exceptions/domain-exceptions';
import { UpdatePostsByBlog } from '../dto/update-posts-by-blog.dto';
import {
  PostLike,
  PostLikeDocument,
  PostLikeModelType,
} from '../domain/postLike.entity';
import { PostLikeStatus } from '../api/view-dto/posts.view-dto';

@Injectable()
export class PostsRepository {
  constructor(
    @InjectModel(Post.name) private readonly PostModel: PostModelType,
    @InjectModel(PostLike.name)
    private readonly PostLikeModel: PostLikeModelType,
  ) {}

  async save(doc: PostDocument | PostLikeDocument): Promise<string> {
    await doc.save();
    return doc._id.toString();
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
    const ids = await this.PostModel.find({ blogId }).then((posts) => {
      return posts.map((post) => post._id.toString());
    });
    this.PostModel.updateMany({ blogId: blogId }, { deletedAt: new Date() });
    this.PostLikeModel.deleteMany({
      postId: { $in: ids },
    });
  }

  async deletePost(post: PostDocument) {
    post.markDeleted();
    await Promise.all([
      this.PostLikeModel.deleteOne({ postId: post._id.toString() }),
      this.save(post),
    ]);
  }

  async findPostIdsByBlog(blogId: string): Promise<string[]> {
    return this.PostModel.find({ blogId }).then((posts) =>
      posts.map((post) => post._id.toString()),
    );
  }

  async findPostLikeByUserId(
    postId: string,
    userId: string,
  ): Promise<PostLikeDocument | null> {
    return this.PostLikeModel.findOne({
      postId,
      userId,
    });
  }
  async getRecentLikeDocsForPost(
    postId: string,
    status: PostLikeStatus,
  ): Promise<PostLikeDocument[]> {
    const recentLikesDocs = await this.PostLikeModel.find({
      postId,
      status,
    })
      .sort({ updatedAt: 'desc' })
      .limit(3);
    return recentLikesDocs;
  }
}
