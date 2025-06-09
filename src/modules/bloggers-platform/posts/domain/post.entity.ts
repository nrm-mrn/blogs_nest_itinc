import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';
import { UpdatePostDto } from '../dto/update-post.dto';
import { DomainException } from 'src/core/exceptions/domain-exceptions';
import { DomainExceptionCode } from 'src/core/exceptions/domain-exception-codes';
import { CreatePostDomainDto } from './dto/create-post-domain-dto';
import {
  ExtendedLikesInfo,
  ExtendedLikesInfoSchema,
} from './extendedLikes.schema';

export const postTitleConstr = {
  maxLength: 30,
};
export const postDescriptionConstr = {
  maxLength: 100,
};
export const postContentConstr = {
  maxLength: 1000,
};

/**
 * Post entity schema
 * This class represents the schema and behaviour of the post entity
 */
@Schema({ timestamps: true })
export class Post {
  /**
   * Post title
   * @type {string}
   */
  @Prop({ type: String, required: true, ...postTitleConstr })
  title: string;

  /**
   * Post short description
   * @type {string}
   */
  @Prop({ type: String, required: true, ...postDescriptionConstr })
  public shortDescription: string;

  /**
   * Post content
   * @type {string}
   */
  @Prop({ type: String, required: true, ...postContentConstr })
  public content: string;

  /**
   * Post's parent blog id
   * @type {string}
   */
  @Prop({ type: String, required: true })
  public blogId: string;

  @Prop({ type: ExtendedLikesInfoSchema, default: new ExtendedLikesInfo() })
  public extendedLikesInfo: ExtendedLikesInfo;

  /**
   * Post's parent blog name
   * @type {string}
   */
  @Prop({ type: String, required: true })
  public blogName: string;

  /**
   * Timestamps
   * @type {Date}
   */
  createdAt: Date;
  updatedAt: Date;

  /**
   * Deletion timestamp
   * nullable, if exists - means entity is soft deleted
   * @type {Date | null}
   */
  @Prop({ type: Date, nullable: true, default: null })
  deletedAt: Date | null;

  /**
   * Creates post instance from provided dto
   * @param {CreatePostDomainDto} dto
   */
  static createPost(dto: CreatePostDomainDto): PostDocument {
    const post = new this();
    post.title = dto.title;
    post.shortDescription = dto.shortDescription;
    post.content = dto.content;
    post.blogId = dto.blogId;
    post.blogName = dto.blogName;
    // post.extendedLikesInfo = {
    //   likesCount: 0,
    //   dislikesCount: 0,
    //   newestLikes: [],
    // };

    return post as PostDocument;
  }

  /**
   * Updates fields in post instance with provided values
   * @param {UpdatePostDto} dto
   */
  updatePost(dto: UpdatePostDto) {
    this.title = dto.title;
    this.shortDescription = dto.shortDescription;
    this.content = dto.content;
    this.blogId = dto.blogId;
    return;
  }

  /**
   * Marks the post as deleted
   * @throws {DomainException} if already deleted
   */
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

export type PostDocument = HydratedDocument<Post>;
export type PostModelType = Model<PostDocument> & typeof Post;
export const PostSchema = SchemaFactory.createForClass(Post);

PostSchema.loadClass(Post);
