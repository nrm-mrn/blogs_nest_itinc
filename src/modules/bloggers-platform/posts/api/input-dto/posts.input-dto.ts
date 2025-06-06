import { IsStringWithTrim } from 'src/core/decorators/validators/is-string-with-trim';
import {
  postContentConstr,
  postDescriptionConstr,
  postTitleConstr,
} from '../../domain/post.entity';
import { IsValidObjectId } from 'src/core/decorators/validators/is-valid-object-id';

export class CreatePostInputDto {
  @IsStringWithTrim(0, postTitleConstr.maxLength)
  title: string;

  @IsStringWithTrim(0, postDescriptionConstr.maxLength)
  shortDescription: string;

  @IsStringWithTrim(0, postContentConstr.maxLength)
  content: string;

  @IsValidObjectId()
  blogId: string;
}

export class UpdatePostInputDto {
  @IsStringWithTrim(0, postTitleConstr.maxLength)
  title: string;

  @IsStringWithTrim(0, postDescriptionConstr.maxLength)
  shortDescription: string;

  @IsStringWithTrim(0, postContentConstr.maxLength)
  content: string;

  @IsValidObjectId()
  blogId: string;
}
