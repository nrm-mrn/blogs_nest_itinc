import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CreateApiRequestDomainDto } from './dto/create-apiRequest.domain.dto';
import { HydratedDocument, Model } from 'mongoose';

@Schema({ timestamps: true })
export class ApiRequest {
  @Prop({ type: String, required: true, unique: true })
  key: string;

  @Prop({ type: [Number], default: [] })
  timestamps: number[];

  @Prop({ type: Number, default: 0 })
  blockedUntil: number;

  createdAt: string;
  updatedAt: string;

  static createApiRequest(dto: CreateApiRequestDomainDto) {
    const req = new this();
    req.key = dto.key;
    req.timestamps = dto.timestamps;
    req.blockedUntil = 0;

    return req as ApiRequestDocument;
  }
}

export type ApiRequestDocument = HydratedDocument<ApiRequest>;
export type ApiRequestModelType = Model<ApiRequestDocument> & typeof ApiRequest;
export const ApiRequestSchema = SchemaFactory.createForClass(ApiRequest);

ApiRequestSchema.loadClass(ApiRequest);
