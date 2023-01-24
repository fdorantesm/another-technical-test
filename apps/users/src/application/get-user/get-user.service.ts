import { IApplicationService } from '@app/commons/application/contracts/application-service';
import { Inject, Injectable } from '@nestjs/common';
import { IUserSchema } from '../../domain/user';
import { UserRepository } from '../../infrastructure/repositories/user.repository';
import { USER_REPOSITORY } from '../constants/injection-tokens';
import { GetUserCommand } from './get-user.command';

@Injectable()
export class GetUserService implements IApplicationService<GetUserCommand> {
  constructor(
    @Inject(USER_REPOSITORY) private userRespository: UserRepository,
  ) {}

  async process(command: GetUserCommand): Promise<IUserSchema> {
    const user = await this.userRespository.getById(command.id);

    return user.entityRoot();
  }
}
