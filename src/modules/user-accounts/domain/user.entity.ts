import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  EmailConfirmation,
  EmailConfirmationSchema,
} from './emailConfirmation.schema';
import {
  PasswordRecovery,
  PasswordRecoverySchema,
} from './passRecovery.schema';
import { randomUUID, UUID } from 'crypto';
import { DateTime, Duration } from 'luxon';
import { HydratedDocument, Model } from 'mongoose';
import { CreateUserDomainDto } from './dto/create-user.domain.dto';
import {
  DomainException,
  Extension,
} from 'src/core/exceptions/domain-exceptions';
import { DomainExceptionCode } from 'src/core/exceptions/domain-exception-codes';

export const loginConstraints = {
  minLength: 3,
  maxLength: 10,
};

export const passwordConstraints = {
  minLength: 6,
  maxLength: 20,
};

/**
 * User entity schema
 * This class represents the schema and behaviour of the user entity
 */
@Schema({ timestamps: true })
export class User {
  /**
   * User name
   * @type {string}
   * @required
   */
  @Prop({ type: String, required: true, ...loginConstraints })
  login: string;

  /**
   * user email
   * @type {string}
   * @required
   */
  @Prop({ type: String, required: true })
  email: string;

  /**
   * user password hash
   * @type {string}
   * @required
   */
  @Prop({ type: String, required: true })
  passwordHash: string;

  @Prop({ type: EmailConfirmationSchema, required: false, default: null })
  emailConfirmation: EmailConfirmation | null;

  @Prop({ type: PasswordRecoverySchema, required: false, default: null })
  passwordRecovery: PasswordRecovery | null;
  /**
   * Timestamps
   * @type {Date}
   */
  createdAt: Date;
  updatedAt: Date;

  /**
   * Deletion timestamp
   * nullable, if exists - user is deleted
   * @type {Date | null}
   */
  @Prop({ type: Date, nullable: true })
  deletedAt: Date | null;

  /**
   * Generates random UUID, used in pass recovery
   * and email confirmation
   */
  genConfirmationCode(): UUID {
    return randomUUID();
  }

  /**
   * generates pass recovery confirmation code and sets
   * related fields in passwordRecovery obj
   */
  genPasswordRecovery(duration: Duration) {
    this.passwordRecovery = {
      confirmationCode: this.genConfirmationCode(),
      expirationDate: DateTime.now().plus(duration).toJSDate(),
    };
  }

  /**
   * generates email confirmation code and sets related
   * fields in email.Confirmation object
   */
  genEmailConfirmation(duration: Duration) {
    this.emailConfirmation = {
      expirationDate: DateTime.now().plus(duration).toJSDate(),
      confirmationCode: this.genConfirmationCode(),
      isConfirmed: false,
    };
  }

  /**
   * checks pass recovery code expiration
   * and resets password hash
   */
  confirmPassword(newPassHash: string) {
    if (!this.passwordRecovery) {
      throw new DomainException({
        code: DomainExceptionCode.InternalServerError,
        message: 'No password confirmation object in entity',
      });
    }
    if (
      DateTime.fromJSDate(this.passwordRecovery.expirationDate) < DateTime.now()
    ) {
      throw new DomainException({
        code: DomainExceptionCode.PasswordRecoveryCodeExpired,
        message: 'Pass recovery code has expired',
        extensions: [
          new Extension('Pass recovery code has expired', 'recoveryCode'),
        ],
      });
    }
    this.passwordHash = newPassHash;
    this.passwordRecovery = null;
  }

  /**
   * checks email is not confirmed and code is not expired
   * marks email as confirmed
   */
  confirmEmail() {
    if (!this.emailConfirmation) {
      throw new DomainException({
        code: DomainExceptionCode.InternalServerError,
        message: 'No email confirmation object in entity',
      });
    }
    if (this.emailConfirmation.isConfirmed) {
      throw new DomainException({
        code: DomainExceptionCode.BadRequest,
        message: 'Email is already confirmed',
        extensions: [new Extension('Email is already confirmed', 'code')],
      });
    }
    if (
      DateTime.fromJSDate(this.emailConfirmation.expirationDate) <
      DateTime.now()
    ) {
      throw new DomainException({
        code: DomainExceptionCode.ConfirmationCodeExpired,
        message: 'Email confirmation code has expired',
        extensions: [new Extension('Email code has expired', 'code')],
      });
    }
    this.emailConfirmation.isConfirmed = true;
  }

  markDeleted() {
    if (this.deletedAt !== null) {
      throw new DomainException({
        code: DomainExceptionCode.NotFound,
        message: 'Entity is already deleted',
      });
    }
    this.deletedAt = new Date();
  }

  static createUser(dto: CreateUserDomainDto): UserDocument {
    const user = new this();
    user.email = dto.email;
    user.login = dto.login;
    user.passwordHash = dto.passHash;

    return user as UserDocument;
  }
}

export type UserDocument = HydratedDocument<User>;
export type UserModelType = Model<UserDocument> & typeof User;

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.loadClass(User);
