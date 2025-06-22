import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { GetUsersQueryParams } from './input-dto/get-users-query-params.input-dto';
import { PaginatedViewDto } from 'src/core/dto/base.paginated.view-dto';
import { UserViewDto } from './view-dto/users.view-dto';
import { BasicAuthGuard } from '../guards/basic/basic-auth.guard';
import { CreateUserDto } from '../dto/create-user.dto';
import { ObjectIdValidationPipe } from 'src/core/pipes/object-id-validation-pipe.service';
import { CreateUserInputDto } from './input-dto/create-user.input-dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserByAdminCommand } from '../application/usecases/create-user.usecase';
import { GetUserQuery } from '../application/queries/get-user.query';
import { GetAllUsersQuery } from '../application/queries/get-all-users.query';
import { DeleteUserCommand } from '../application/usecases/delete-user.usecase';

@Controller('users')
@UseGuards(BasicAuthGuard)
export class UsersController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllUsers(
    @Query() query: GetUsersQueryParams,
  ): Promise<PaginatedViewDto<UserViewDto[]>> {
    return this.queryBus.execute(new GetAllUsersQuery(query));
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() body: CreateUserInputDto): Promise<UserViewDto> {
    const input: CreateUserDto = {
      login: body.login,
      email: body.email,
      password: body.password,
    };
    const { userId } = await this.commandBus.execute(
      new CreateUserByAdminCommand(input.login, input.password, input.email),
    );
    const user = await this.queryBus.execute(new GetUserQuery(userId));
    return user;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(@Param('id', ObjectIdValidationPipe) id: string) {
    return this.commandBus.execute(new DeleteUserCommand(id));
  }
}
