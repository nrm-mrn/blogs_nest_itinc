import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './domain/user.entity';
import { UsersController } from './api/users.controller';
import { UsersService } from './application/users.service';
import { UsersQueryRepository } from './infrastructure/users.query-repository';
import { UsersRepository } from './infrastructure/users.repository';
import { BasicAuthGuard } from './guards/basic/basic-auth.guard';
import { HashService } from './adapters/passHash.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ConfigModule,
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    UsersQueryRepository,
    UsersRepository,
    BasicAuthGuard,
    HashService,
  ],
  exports: [BasicAuthGuard],
})
export class UserAccountsModule {}
