import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Ip,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../application/auth.service';
import { SessionsService } from '../application/devices-security.service';
import { UserLoginInputDto } from './input-dto/user-login-dto';
import { LoginDto } from '../dto/login.dto';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { ConfigurationType } from 'src/modules/config/config.module';
import { MeViewDto } from './view-dto/users.view-dto';
import { ExtractUserFromRequest } from '../guards/decorators/extract-user-from-request.decorator';
import { UserContextDto } from '../guards/dto/user-context.dto';
import { UsersQueryRepository } from '../infrastructure/query/users.query-repository';
import { RegisterUserInputDto } from './input-dto/register-user.input-dto';
import { ResendEmailConfirmationInputDto } from './input-dto/resend-email.input-dto';
import { ConfirmEmailInputDto } from './input-dto/email-confirm.input-dto';
import { PassRecoverInputDto } from './input-dto/pass-recover.input-dto';
import { ConfirmPasswordDto } from '../dto/confirm-password.dto';
import { ConfirmPasswordInputDto } from './input-dto/pass-confirm.input-dto';
import { JwtAuthGuard } from '../guards/bearer/jwt-auth.guard';
import { RefreshTokenGuard } from '../guards/bearer/jwt-refresh-token-guard';
import { SkipThrottle, ThrottlerGuard } from '@nestjs/throttler';

@UseGuards(ThrottlerGuard)
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly sessionsService: SessionsService,
    private readonly configService: ConfigService<ConfigurationType>,
    private readonly usersQueryRepo: UsersQueryRepository,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() body: UserLoginInputDto,
    @Headers('user-agent') userAgent: string,
    @Ip() ip: string,
    @Res() response: Response,
  ) {
    if (!userAgent) {
      userAgent = 'default agent';
    }

    const creds: LoginDto = {
      loginOrEmail: body.loginOrEmail,
      password: body.password,
      ip: ip ? ip : '',
      title: userAgent,
    };
    const { accessToken, refreshToken } =
      await this.authService.checkCredentials(creds);
    response
      .cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure:
          this.configService.get('nodeEnv') === 'development' ? false : true,
      })
      .send({ accessToken });
  }

  @UseGuards(RefreshTokenGuard)
  @SkipThrottle()
  @Post('refresh-token')
  @HttpCode(HttpStatus.OK)
  async reissueTokens(@Req() req: Request, @Res() res: Response) {
    const token = req.cookies.refreshToken as string;
    const { refreshToken, accessToken } =
      await this.authService.reissueTokensPair(token);
    res
      .cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure:
          this.configService.get('nodeEnv') === 'development' ? false : true,
      })
      .send({ accessToken });
  }

  @UseGuards(RefreshTokenGuard)
  @SkipThrottle()
  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  async logout(@Req() req: Request, @Res() res: Response) {
    const token = req.cookies.refreshToken as string;
    await this.sessionsService.logout(token);
    res.clearCookie('refreshToken').send();
  }

  @UseGuards(JwtAuthGuard)
  @SkipThrottle()
  @Get('me')
  @HttpCode(HttpStatus.OK)
  async getUserInfo(
    @ExtractUserFromRequest() user: UserContextDto,
  ): Promise<MeViewDto> {
    return this.usersQueryRepo.getUserInfoOrFail(user.userId);
  }

  @Post('registration')
  @HttpCode(HttpStatus.NO_CONTENT)
  async registerUser(@Body() body: RegisterUserInputDto) {
    return this.authService.registerUser(body);
  }

  @Post('registration-email-resending')
  @HttpCode(HttpStatus.NO_CONTENT)
  async resendEmailConfirmation(@Body() dto: ResendEmailConfirmationInputDto) {
    return this.authService.resendConfirmation(dto.email);
  }

  @Post('registration-confirmation')
  @HttpCode(HttpStatus.NO_CONTENT)
  async confirmEmail(@Body() dto: ConfirmEmailInputDto) {
    return this.authService.confirmEmail(dto.code);
  }

  @Post('password-recovery')
  @HttpCode(HttpStatus.NO_CONTENT)
  async recoverPassword(@Body() dto: PassRecoverInputDto) {
    return this.authService.recoverPassword(dto.email);
  }

  @Post('new-password')
  @HttpCode(HttpStatus.NO_CONTENT)
  async confirmPassword(@Body() dto: ConfirmPasswordInputDto) {
    const confirmDto: ConfirmPasswordDto = {
      code: dto.recoveryCode,
      password: dto.newPassword,
    };
    return this.authService.confirmPassword(confirmDto);
  }
}
