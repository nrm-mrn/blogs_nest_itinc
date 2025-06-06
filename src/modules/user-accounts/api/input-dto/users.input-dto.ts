import { UUID } from 'crypto';
import {
  loginConstraints,
  passwordConstraints,
} from '../../domain/user.entity';
import { IsStringWithTrim } from 'src/core/decorators/validators/is-string-with-trim';
import { Trim } from 'src/core/decorators/transform/trim';
import { IsEmail, IsString, IsUUID } from 'class-validator';

export class CreateUserInputDto {
  @IsStringWithTrim(loginConstraints.minLength, loginConstraints.maxLength)
  login: string;

  @IsStringWithTrim(
    passwordConstraints.minLength,
    passwordConstraints.maxLength,
  )
  password: string;

  @Trim()
  @IsString()
  @IsEmail()
  email: string;
}

export class ConfirmPasswordInputDto {
  @IsUUID()
  code: UUID;

  @IsStringWithTrim(
    passwordConstraints.minLength,
    passwordConstraints.maxLength,
  )
  password: string;
}
