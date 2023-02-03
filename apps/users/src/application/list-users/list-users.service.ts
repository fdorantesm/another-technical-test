import { IApplicationService } from '@app/commons/application/contracts/application-service';
import { Inject, Injectable } from '@nestjs/common';
import { IUserSchema } from '../../domain/user';
import { UserRepository } from '../../infrastructure/repositories/user.repository';
import { USER_REPOSITORY } from '../constants/injection-tokens';
import { ListUsersCommand } from './list-users.command';

@Injectable()
export class ListUsersService implements IApplicationService<ListUsersCommand> {
  constructor(
    @Inject(USER_REPOSITORY) private userRespository: UserRepository,
  ) {}

  async process(command: ListUsersCommand): Promise<IUserSchema[]> {
    const result = await this.userRespository.list(command.skip, command.limit);
    const users = result.map((user) => user.entityRoot());
    return users;
  }
}
