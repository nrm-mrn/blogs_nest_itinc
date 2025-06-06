import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CreateBlogDto } from '../dto/create-blog.dto';
import { HydratedDocument, Model } from 'mongoose';
import { UpdateBlogDto } from '../dto/update-blog.dto';
import { DomainException } from 'src/core/exceptions/domain-exceptions';
import { DomainExceptionCode } from 'src/core/exceptions/domain-exception-codes';

export const blogNameConstraints = {
  minLength: 1,
  maxLength: 15,
};

export const blogDescriptionConstraints = {
  maxLength: 500,
};

export const blogUrlConstraint = {
  maxLength: 100,
};

/**
 * Blog entity schema
 * The class represents the schema and behaviour of the blog entity
 */
@Schema({ timestamps: true })
export class Blog {
  /**
   * Blog name
   * @type {string}
   * @required
   */
  @Prop({ type: String, required: true, ...blogNameConstraints })
  name: string;

  /**
   * Blog description
   * @type {string}
   * @required
   */
  @Prop({ type: String, required: true, ...blogDescriptionConstraints })
  description: string;

  /**
   * Blog website URL
   * @type {string}
   * @required
   */
  @Prop({ type: String, required: true, ...blogUrlConstraint })
  websiteUrl: string;

  /**
   * Membership flag
   * indicates wether this blog is accessible only for members
   * @type {boolean}
   * required
   */
  @Prop({ type: Boolean, required: true, default: false })
  isMembership: boolean;

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
  @Prop({ type: Date, nullable: true })
  deletedAt: Date | null;

  /**
   * Creates blog instans from provided dto
   * @param {CreateBlogDto} - data transfer object for blog creation
   */
  static createBlog(dto: CreateBlogDto): BlogDocument {
    const blog = new this();
    blog.name = dto.name;
    blog.description = dto.description;
    blog.websiteUrl = dto.websiteUrl;

    return blog as BlogDocument;
  }

  /**
   * Updates blog instance from provided dto rewriting values from dto
   * @param {UpdateBlogDto} - data transfer object for blog update
   */
  updateBlog(dto: UpdateBlogDto) {
    this.name = dto.name;
    this.description = dto.description;
    this.websiteUrl = dto.websiteUrl;
    return;
  }

  /**
   * Marks the blog as deleted
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

export type BlogDocument = HydratedDocument<Blog>;
export type BlogModelType = Model<BlogDocument> & typeof Blog;

export const BlogSchema = SchemaFactory.createForClass(Blog);

BlogSchema.loadClass(Blog);
