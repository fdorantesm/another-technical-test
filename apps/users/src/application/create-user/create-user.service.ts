import { IApplicationService } from '@app/commons/application/contracts/application-service';
import { Inject, Injectable } from '@nestjs/common';
import { IUserSchema, User } from '../../domain/user';
import { UserRepository } from '../../infrastructure/repositories/user.repository';
import { USER_REPOSITORY } from '../constants/injection-tokens';
import { CreateUserCommand } from './create-user.command';

@Injectable()
export class CreateUserService
  implements IApplicationService<CreateUserCommand>
{
  constructor(
    @Inject(USER_REPOSITORY) private userRespository: UserRepository,
  ) {}

  async process({ name, email, bio }: CreateUserCommand): Promise<IUserSchema> {
    const user = new User({ name, email, bio });

    await this.userRespository.persist(user);

    return user.entityRoot();
  }
}
