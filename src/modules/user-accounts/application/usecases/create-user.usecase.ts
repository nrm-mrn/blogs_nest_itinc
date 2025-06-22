import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UsersRepository } from '../../infrastructure/users.repository';
import { UsersService } from '../users.service';

export class CreateUserByAdminCommand {
  constructor(
    public login: string,
    public password: string,
    public email: string,
  ) {}
}

@CommandHandler(CreateUserByAdminCommand)
export class CreateUserByAdminHandler
  implements ICommandHandler<CreateUserByAdminCommand, { userId: string }>
{
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly usersService: UsersService,
  ) {}

  async execute(
    command: CreateUserByAdminCommand,
  ): Promise<{ userId: string }> {
    const newUser = await this.usersService.createUserDoc(command);
    newUser.confirmEmailByAdmin();
    const userId = await this.usersRepository.save(newUser);
    return { userId };
  }
}
