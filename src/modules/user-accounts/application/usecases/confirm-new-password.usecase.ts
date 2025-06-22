import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UUID } from 'crypto';
import { UsersRepository } from '../../infrastructure/users.repository';
import { HashService } from '../passHash.service';
import { DomainExceptionCode } from 'src/core/exceptions/domain-exception-codes';
import {
  DomainException,
  Extension,
} from 'src/core/exceptions/domain-exceptions';

export class ConfirmPasswordCommand {
  constructor(
    public code: UUID,
    public password: string,
  ) {}
}

@CommandHandler(ConfirmPasswordCommand)
export class ConfirmPasswordHandler
  implements ICommandHandler<ConfirmPasswordCommand>
{
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly hashService: HashService,
  ) {}

  async execute(command: ConfirmPasswordCommand): Promise<any> {
    const user = await this.usersRepository.getUserByPassRecovery(command.code);
    if (!user) {
      throw new DomainException({
        code: DomainExceptionCode.BadRequest,
        message: 'Incorrect recovery code',
        extensions: [new Extension('incorrect recovery code', 'recoveryCode')],
      });
    }
    const hash = await this.hashService.createHash(command.password);
    user.confirmPassword(hash);
    await this.usersRepository.save(user);
    return;
  }
}
