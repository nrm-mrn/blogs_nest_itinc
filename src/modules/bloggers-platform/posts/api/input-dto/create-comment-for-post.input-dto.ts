import { IsStringWithTrim } from 'src/core/decorators/validators/is-string-with-trim';

export const commentContentConst = {
  minLength: 20,
  maxLength: 300,
};

export class CreateCommentForPostInputDto {
  @IsStringWithTrim(
    commentContentConst.minLength,
    commentContentConst.maxLength,
  )
  content: string;
}
