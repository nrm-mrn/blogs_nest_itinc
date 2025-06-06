import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UUID } from 'crypto';

Schema({ _id: false })
export class PasswordRecovery {
  /**
   * confirmation code sent to user email for pass recovery
   * @type: {string}
   * @required
   */
  @Prop({ type: String, required: true })
  confirmationCode: UUID;
  /**
   * expiration date of the confirmation code
   * @type: {Date}
   * @required
   */
  @Prop({ type: Date, required: true })
  expirationDate: Date;
}

export const PasswordRecoverySchema =
  SchemaFactory.createForClass(PasswordRecovery);
