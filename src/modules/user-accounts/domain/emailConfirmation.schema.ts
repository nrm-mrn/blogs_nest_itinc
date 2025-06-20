import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UUID } from 'crypto';

@Schema({ _id: false })
export class EmailConfirmation {
  /**
   * confirmation code for email confirmation
   * @type: {string}
   * @required
   */
  @Prop({ type: String, required: false })
  confirmationCode: UUID | null;
  /**
   * after this date confirmation code no longer valid
   * @type: {Date}
   * @required
   */
  @Prop({ type: Date, required: false })
  expirationDate: Date | null;
  /**
   * flag marks user email as confirmed
   * @type: {boolean}
   * @required
   * @default {false}
   */
  @Prop({ type: Boolean, required: true })
  isConfirmed: boolean;
}

export const EmailConfirmationSchema =
  SchemaFactory.createForClass(EmailConfirmation);
