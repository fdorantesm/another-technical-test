import { IApplicationService } from '@app/commons/application/contracts/application-service';
import { Inject, Injectable } from '@nestjs/common';
import { IUserSchema } from '../../domain/user';
import { UserRepository } from '../../infrastructure/repositories/user.repository';
import { USER_REPOSITORY } from '../constants/injection-tokens';
import { ListUsersWithMetadataCommand } from './list-users-with-metadata.command';

@Injectable()
export class ListUsersWithMetadataService
  implements IApplicationService<ListUsersWithMetadataCommand>
{
  constructor(
    @Inject(USER_REPOSITORY) private userRespository: UserRepository,
  ) {}

  async process(command: ListUsersWithMetadataCommand): Promise<IUserSchema[]> {
    const result = await this.userRespository.listWithRelations(
      command.skip,
      command.limit,
      command.relations,
    );
    const users = result.map((user) => user.toJson());
    return users;
  }
}
