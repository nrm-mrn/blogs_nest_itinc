import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CreateSessionDomainDto } from './dto/create-session.domain.dto';
import mongoose, { HydratedDocument, Model } from 'mongoose';

@Schema({ timestamps: true })
export class DeviceAuthSession {
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  _id: mongoose.Types.ObjectId;

  @Prop({ type: String, required: true })
  userId: string;

  @Prop({ type: Date, required: true })
  iat: Date;

  @Prop({ type: Date, required: true })
  expiration: Date;

  @Prop({ type: String, required: true })
  ip: string;

  @Prop({ type: String, required: true })
  title: string; //NOTE: user-agent header

  createdAt: string;
  updatedAt: string;

  static createSession(dto: CreateSessionDomainDto) {
    const session = new this();
    session._id = dto.deviceId;
    session.userId = dto.userId;
    session.iat = new Date(dto.iat);
    session.ip = dto.ip;
    session.title = dto.title;
    session.expiration = dto.expiration;

    return session as SessionDocument;
  }
}

export type SessionDocument = HydratedDocument<DeviceAuthSession>;
export type SessionModelType = Model<SessionDocument> &
  typeof DeviceAuthSession;
export const SessionSchema = SchemaFactory.createForClass(DeviceAuthSession);

SessionSchema.loadClass(DeviceAuthSession);
