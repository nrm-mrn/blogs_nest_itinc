import { IsStringWithTrim } from 'src/core/decorators/validators/is-string-with-trim';
import {
  blogDescriptionConstraints,
  blogNameConstraints,
  blogUrlConstraint,
} from '../../domain/blog.entity';
import { IsUrl } from 'class-validator';

export class CreateBlogInputDto {
  @IsStringWithTrim(
    blogNameConstraints.minLength,
    blogNameConstraints.maxLength,
  )
  name: string;

  @IsStringWithTrim(1, blogDescriptionConstraints.maxLength)
  description: string;

  @IsStringWithTrim(1, blogUrlConstraint.maxLength)
  @IsUrl()
  websiteUrl: string;
}

export class UpdateBlogInputDto {
  @IsStringWithTrim(
    blogNameConstraints.minLength,
    blogNameConstraints.maxLength,
  )
  name: string;

  @IsStringWithTrim(1, blogDescriptionConstraints.maxLength)
  description: string;

  @IsStringWithTrim(1, blogUrlConstraint.maxLength)
  @IsUrl()
  websiteUrl: string;
}
