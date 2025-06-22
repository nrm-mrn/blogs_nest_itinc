import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UsersRepository } from '../../infrastructure/users.repository';

export class DeleteUserCommand {
  constructor(public userId: string) {}
}

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {
  constructor(private readonly usersRepository: UsersRepository) {}
  async execute(command: DeleteUserCommand): Promise<any> {
    const user = await this.usersRepository.findOrNotFoundFail(command.userId);
    await this.usersRepository.deleteUser(user);
  }
}
