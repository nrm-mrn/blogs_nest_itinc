import { MailerService } from '@nestjs-modules/mailer';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { EmailTemplates } from 'src/modules/notifications/email.templates';
import { UsersRepository } from '../../infrastructure/users.repository';
import { Duration } from 'luxon';
import { UserAccountConfig } from '../../config/user-account.config';

export class RecoverPasswordCommand {
  constructor(public email: string) {}
}

@CommandHandler(RecoverPasswordCommand)
export class RecoverPasswordHandler
  implements ICommandHandler<RecoverPasswordCommand>
{
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly mailerService: MailerService,
    private readonly templateFactory: EmailTemplates,
    private readonly configService: UserAccountConfig,
  ) {}

  async execute(command: RecoverPasswordCommand): Promise<any> {
    const user = await this.usersRepository.findUserByEmail(command.email);
    if (!user) {
      return null;
    }
    const expiration = Duration.fromObject({
      minutes: this.configService.passRecoveryExpiration,
    });
    user.genPasswordRecovery(expiration);
    const emailTemplate = this.templateFactory.generatePassRecoveryEmail(
      this.configService.confirmationCodesDomain,
      user.passwordRecovery!.confirmationCode,
    );

    this.mailerService
      .sendMail({
        to: command.email,
        subject: 'Blogs service password recovery request',
        html: emailTemplate,
      })
      .catch((err) => console.error(`Error sending email: ${err}`));

    await this.usersRepository.save(user);
    return;
  }
}
