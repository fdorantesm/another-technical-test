import { IApplicationService } from '@app/commons/application/contracts/application-service';
import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../../domain/contracts/user.repository';
import { IUserSchema, User } from '../../domain/user';
import { UserRepository } from '../../infrastructure/repositories/user.repository';
import { USER_REPOSITORY } from '../constants/injection-tokens';
import { CreateUserCommand } from './create-user.command';

@Injectable()
export class CreateUserService
  implements IApplicationService<CreateUserCommand>
{
  constructor(
    @Inject(USER_REPOSITORY) private userRespository: IUserRepository,
  ) {}

  async process({
    name,
    email,
    code,
  }: CreateUserCommand): Promise<IUserSchema> {
    const user = new User({ name, email, code });

    await this.userRespository.persist(user);

    return user.entityRoot();
  }
}
