import { IApplicationService } from '@app/commons/application/contracts/application-service';
import { Inject, Injectable } from '@nestjs/common';
import { IUserSchema } from '../../domain/user';
import { UserRepository } from '../../infrastructure/repositories/user.repository';
import { USER_REPOSITORY } from '../constants/injection-tokens';

@Injectable()
export class ListUsersService implements IApplicationService {
  constructor(
    @Inject(USER_REPOSITORY) private userRespository: UserRepository,
  ) {}

  async process(): Promise<IUserSchema[]> {
    return (await this.userRespository.list()).map((user) => user.entityRoot());
  }
}
