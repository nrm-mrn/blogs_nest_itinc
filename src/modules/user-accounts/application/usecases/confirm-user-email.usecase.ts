import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DomainExceptionCode } from 'src/core/exceptions/domain-exception-codes';
import {
  DomainException,
  Extension,
} from 'src/core/exceptions/domain-exceptions';
import { UsersRepository } from '../../infrastructure/users.repository';
import { UUID } from 'crypto';

export class ConfirmUserEmailCommand {
  constructor(public code: UUID) {}
}

@CommandHandler(ConfirmUserEmailCommand)
export class ConfirmUserEmailHandler
  implements ICommandHandler<ConfirmUserEmailCommand>
{
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(command: ConfirmUserEmailCommand): Promise<any> {
    const user = await this.usersRepository.findUserByEmailConfirmation(
      command.code,
    );
    if (!user) {
      throw new DomainException({
        code: DomainExceptionCode.BadRequest,
        message: 'User with provided code does not exist',
        extensions: [
          new Extension('User with provided code does not exist', 'code'),
        ],
      });
    }
    user.confirmEmail();
    await this.usersRepository.save(user);
    return;
  }
}
