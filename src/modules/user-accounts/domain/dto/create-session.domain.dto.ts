import mongoose from 'mongoose';

export class CreateSessionDomainDto {
  deviceId: mongoose.Types.ObjectId;
  userId: string;
  iat: number;
  ip: string;
  title: string;
  expiration: Date;
}
