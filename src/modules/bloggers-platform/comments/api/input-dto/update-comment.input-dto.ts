import { IsStringWithTrim } from 'src/core/decorators/validators/is-string-with-trim';
import { commentContentConst } from 'src/modules/bloggers-platform/posts/api/input-dto/create-comment-for-post.input-dto';

export class UpdateCommentInputDto {
  @IsStringWithTrim(
    commentContentConst.minLength,
    commentContentConst.maxLength,
  )
  content: string;
}
