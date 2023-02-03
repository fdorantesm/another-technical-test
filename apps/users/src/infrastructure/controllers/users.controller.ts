import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Inject,
  Post,
} from '@nestjs/common';
import { CreateUserCommand } from '../../application/create-user/create-user.command';
import { CreateUserService } from '../../application/create-user/create-user.service';
import { IUserSchema } from '../../domain/user';
import {
  ParsedQueryOptions,
  QueryParser,
} from '@app/commons/infrastructure/decorators/query-params.decorator';
import { ListUsersWithMetadataService } from '../../application/list-users-with-metadata/list-users-with-metadata.service';
import {
  CREATE_USER_SERVICE,
  LIST_USERS_SERVICE,
  LIST_USERS_WITH_METADATA_SERVICE,
} from '../../application/constants/injection-tokens';
import { IApplicationService } from '@app/commons/application/contracts/application-service';
import { ListUsersWithMetadataCommand } from '../../application/list-users-with-metadata/list-users-with-metadata.command';
import { ListUsersCommand } from '../../application/list-users/list-users.command';

@Controller('users')
export class UsersController {
  constructor(
    @Inject(CREATE_USER_SERVICE)
    private readonly createUserService: IApplicationService<CreateUserCommand>,

    @Inject(LIST_USERS_WITH_METADATA_SERVICE)
    private readonly listUsersWithMetadataService: IApplicationService<ListUsersWithMetadataCommand>,
    @Inject(LIST_USERS_SERVICE)
    private readonly listUsersService: IApplicationService<ListUsersCommand>,
  ) {}

  @Get('/')
  async list(
    @QueryParser('options') options: ParsedQueryOptions,
  ): Promise<IUserSchema[] | any> {
    const { limit, skip } = options;
    if (options?.with?.length > 0) {
      return this.listUsersWithMetadataService.process({
        skip,
        limit,
        relations: options.with,
      });
    }

    return this.listUsersService.process({
      skip,
      limit,
    });
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
