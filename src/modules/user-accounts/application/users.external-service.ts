import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../infrastructure/users.repository';
import { UserDocument } from '../domain/user.entity';

@Injectable()
export class UsersExternalService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async findUserById(id: string): Promise<UserDocument | null> {
    return this.usersRepository.findById(id);
  }
}
