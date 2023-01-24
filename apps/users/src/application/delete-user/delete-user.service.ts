import { IApplicationService } from '@app/commons/application/contracts/application-service';
import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../../infrastructure/repositories/user.repository';
import { USER_REPOSITORY } from '../constants/injection-tokens';
import { DeleteUserCommand } from './delete-user.command';

@Injectable()
export class DeleteUserService
  implements IApplicationService<DeleteUserCommand>
{
  constructor(
    @Inject(USER_REPOSITORY) private userRespository: UserRepository,
  ) {}

  async process(command: DeleteUserCommand): Promise<void> {
    await this.userRespository.deleteById(command.id);
  }
}
