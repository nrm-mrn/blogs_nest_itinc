import { IsStringWithTrim } from 'src/core/decorators/validators/is-string-with-trim';
import {
  postContentConstr,
  postDescriptionConstr,
  postTitleConstr,
} from '../../domain/post.entity';
import { IsValidObjectId } from 'src/core/decorators/validators/is-valid-object-id';

export class CreatePostInputDto {
  @IsStringWithTrim(1, postTitleConstr.maxLength)
  title: string;

  @IsStringWithTrim(1, postDescriptionConstr.maxLength)
  shortDescription: string;

  @IsStringWithTrim(1, postContentConstr.maxLength)
  content: string;

  @IsValidObjectId()
  blogId: string;
}

export class UpdatePostInputDto {
  @IsStringWithTrim(1, postTitleConstr.maxLength)
  title: string;

  @IsStringWithTrim(1, postDescriptionConstr.maxLength)
  shortDescription: string;

  @IsStringWithTrim(1, postContentConstr.maxLength)
  content: string;

  @IsValidObjectId()
  blogId: string;
}
