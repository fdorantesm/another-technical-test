import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { CreateUserCommand } from '../../application/create-user/create-user.command';
import { CreateUserService } from '../../application/create-user/create-user.service';
import { ListUsersService } from '../../application/list-users/list-users.service';
import { IUserSchema } from '../../domain/user';

@Controller('users')
export class UsersController {
  constructor(
    private readonly createUserService: CreateUserService,
    private readonly listUsersService: ListUsersService,
  ) {}

  @Get('/')
  async list(): Promise<IUserSchema[]> {
    return this.listUsersService.process();
  }

  @Post()
  create(@Body() createUserCommand: CreateUserCommand): Promise<IUserSchema> {
    try {
      return this.createUserService.process(createUserCommand);
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
