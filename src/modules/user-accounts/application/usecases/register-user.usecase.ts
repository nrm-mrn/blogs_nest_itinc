import { MailerService } from '@nestjs-modules/mailer';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { EmailTemplates } from 'src/modules/notifications/email.templates';
import { UsersService } from '../users.service';
import { Duration } from 'luxon';
import { UUID } from 'crypto';
import { UsersRepository } from '../../infrastructure/users.repository';
import { UserAccountConfig } from '../../config/user-account.config';

export class RegisterUserCommand {
  constructor(
    public login: string,
    public password: string,
    public email: string,
  ) {}
}

@CommandHandler(RegisterUserCommand)
export class RegisterUserHandler
  implements ICommandHandler<RegisterUserCommand>
{
  constructor(
    private readonly usersService: UsersService,
    private readonly usersRepository: UsersRepository,
    private readonly mailerService: MailerService,
    private readonly templateFactory: EmailTemplates,
    private readonly configService: UserAccountConfig,
  ) {}

  async execute(command: RegisterUserCommand): Promise<void> {
    const user = await this.usersService.createUserDoc(command);

    const expiration = Duration.fromObject({
      minutes: this.configService.emailExpiration,
    });
    user.genEmailConfirmation(expiration);

    const email = this.templateFactory.generateRegistrationEmail(
      this.configService.confirmationCodesDomain,
      user.emailConfirmation!.confirmationCode as UUID,
    );

    this.mailerService
      .sendMail({
        to: user.email,
        subject: 'Bloggers platform registration',
        html: email,
      })
      .catch((err) => console.error(`error sending email: ${err}`));

    await this.usersRepository.save(user);
  }
}
