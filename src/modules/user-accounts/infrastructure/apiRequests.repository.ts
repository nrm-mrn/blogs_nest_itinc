import { InjectModel } from '@nestjs/mongoose';
import { ThrottlerStorage } from '@nestjs/throttler';
import { ThrottlerStorageRecord } from '@nestjs/throttler/dist/throttler-storage-record.interface';
import { ApiRequest, ApiRequestModelType } from '../domain/apiRequest.entity';

export class ApiRequestsStorage implements ThrottlerStorage {
  constructor(
    @InjectModel(ApiRequest.name)
    private readonly ApiRequestModel: ApiRequestModelType,
  ) {}

  async increment(
    key: string,
    ttl: number,
    limit: number,
    blockDuration: number,
    throttlerName: string,
  ): Promise<ThrottlerStorageRecord> {
    const now = Date.now();
    const windowStart = now - ttl;

    const record = await this.ApiRequestModel.findOne({ key }).exec();

    if (!record) {
      const newRec = this.ApiRequestModel.createApiRequest({
        key,
        timestamps: [now],
      });
      await newRec.save();
      return {
        totalHits: 1,
        timeToExpire: ttl,
        isBlocked: false,
        timeToBlockExpire: 0,
      };
    }

    if (record.blockedUntil && now < record.blockedUntil) {
      const timeToBlockExpire = record.blockedUntil - now;
      return {
        totalHits: limit,
        timeToExpire: 0,
        timeToBlockExpire,
        isBlocked: true,
      };
    }

    // Remove expired timestamps
    const recentHits = record.timestamps.filter((ts) => ts > windowStart);
    recentHits.push(now);

    const totalHits = recentHits.length;
    const isBlocked = totalHits > limit;

    if (isBlocked) {
      record.blockedUntil = now + blockDuration;
      await record.save();
      return {
        totalHits,
        timeToExpire: 0,
        timeToBlockExpire: blockDuration,
        isBlocked: true,
      };
    }

    record.timestamps = recentHits;
    record.blockedUntil = 0;
    await record.save();

    const timeToExpire = ttl - (now - recentHits[0]);

    return {
      totalHits,
      timeToExpire,
      isBlocked: false,
      timeToBlockExpire: 0,
    };
  }
}
