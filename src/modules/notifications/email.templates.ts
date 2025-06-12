import { Injectable } from '@nestjs/common';
import { ConfigurationType } from '../config/config.module';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailTemplates {
  constructor(
    private readonly configService: ConfigService<ConfigurationType>,
  ) {}

  generateRegistrationEmail(code: string): string {
    return ` <h1>Thank for your registration</h1>
               <p>To finish registration please follow the link below:<br>
                  <a href='https://${this.configService.get('confirmationCodesDomain')}/confirm-email?code=${code}'>complete registration</a>
              </p>`;
  }

  generatePassRecoveryEmail(code: string): string {
    return `<h1>Password recovery</h1>
       <p>To finish password recovery please follow the link below:
          <a href='https://${this.configService.get('confirmationCodesDomain')}/password-recovery?recoveryCode=${code}'>recovery password</a>
      </p>`;
  }
}
