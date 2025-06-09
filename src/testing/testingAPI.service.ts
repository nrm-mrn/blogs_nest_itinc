import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class testingAPIService {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  async clearDb() {
    await this.connection.dropDatabase();
  }
}
