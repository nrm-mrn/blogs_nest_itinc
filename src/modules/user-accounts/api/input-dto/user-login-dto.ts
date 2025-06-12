import { IsStringWithTrim } from 'src/core/decorators/validators/is-string-with-trim';
import {
  loginConstraints,
  passwordConstraints,
} from '../../domain/user.entity';

export class UserLoginInputDto {
  @IsStringWithTrim(loginConstraints.minLength, loginConstraints.maxLength)
  loginOrEmail: string;

  @IsStringWithTrim(
    passwordConstraints.minLength,
    passwordConstraints.maxLength,
  )
  password: string;
}
