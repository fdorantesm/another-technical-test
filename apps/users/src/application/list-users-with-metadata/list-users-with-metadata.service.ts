import { IApplicationService } from '@app/commons/application/contracts/application-service';
import { Inject, Injectable } from '@nestjs/common';
import { IUserSchema } from '../../domain/user';
import { UserRepository } from '../../infrastructure/repositories/user.repository';
import { S3_SERVICE, USER_REPOSITORY } from '../constants/injection-tokens';
import { ListUsersWithMetadataCommand } from './list-users-with-metadata.command';
import { getPathFromUrl } from '@app/commons/utils/get-path-from-url.util';
import { S3Service } from '../../infrastructure/services/s3.service';
import { PromisePool } from '@supercharge/promise-pool';
import { IS3Service } from '../../domain/contracts/s3.service';
import { IUserRepository } from '../../domain/contracts/user.repository';

@Injectable()
export class ListUsersWithMetadataService
  implements IApplicationService<ListUsersWithMetadataCommand>
{
  constructor(
    @Inject(USER_REPOSITORY) private userRespository: IUserRepository,
    @Inject(S3_SERVICE) private readonly s3Service: IS3Service,
  ) {}

  async process(command: ListUsersWithMetadataCommand): Promise<IUserSchema[]> {
    const result = await this.userRespository.listWithRelations(
      command.skip,
      command.limit,
      command.relations ?? [],
    );

    const { results } = await PromisePool.withConcurrency(1)
      .for(result)
      .process(async (instance) => {
        const imagePathUrl = getPathFromUrl(instance.metadata.image);
        const signedUrl = await this.s3Service.getSignedUrl(
          imagePathUrl,
          'default',
        );

        const user = instance.toJson();

        return {
          ...user,
          metadata: {
            ...user.metadata,
            image: signedUrl,
          },
        };
      });

    return results;
  }
}
