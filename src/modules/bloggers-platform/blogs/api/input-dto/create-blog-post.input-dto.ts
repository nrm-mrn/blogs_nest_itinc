import { IsStringWithTrim } from 'src/core/decorators/validators/is-string-with-trim';
import {
  postTitleConstr,
  postDescriptionConstr,
  postContentConstr,
} from 'src/modules/bloggers-platform/posts/domain/post.entity';

export class CreateBlogPostInputDto {
  @IsStringWithTrim(0, postTitleConstr.maxLength)
  title: string;

  @IsStringWithTrim(0, postDescriptionConstr.maxLength)
  shortDescription: string;

  @IsStringWithTrim(0, postContentConstr.maxLength)
  content: string;
}
