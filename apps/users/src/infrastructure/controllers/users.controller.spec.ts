import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import {
  CREATE_USER_SERVICE,
  LIST_USERS_SERVICE,
  LIST_USERS_WITH_METADATA_SERVICE,
  S3_SERVICE,
  USER_REPOSITORY,
} from '../../application/constants/injection-tokens';
import { CreateUserService } from '../../application/create-user/create-user.service';
import { UserMemoryRepository } from '../repositories/user.repository.memory';
import { ListUsersWithMetadataService } from '../../application/list-users-with-metadata/list-users-with-metadata.service';
import { S3Service } from '../services/s3.service';
import { ConfigModule } from '@nestjs/config';
import { options } from '@app/config/options/config.options';
import { ListUsersService } from '../../application/list-users/list-users.service';
import { UserEntity } from '../domain/user.entity';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(options)],
      controllers: [UsersController],
      providers: [
        {
          provide: CREATE_USER_SERVICE,
          useClass: CreateUserService,
        },
        {
          provide: USER_REPOSITORY,
          useClass: UserMemoryRepository,
        },
        {
          provide: LIST_USERS_WITH_METADATA_SERVICE,
          useClass: ListUsersWithMetadataService,
        },
        {
          provide: LIST_USERS_SERVICE,
          useClass: ListUsersService,
        },
        {
          provide: S3_SERVICE,
          useClass: S3Service,
        },
      ],
    }).compile();

    controller = app.get<UsersController>(UsersController);
  });

  it('should be defined"', () => {
    expect(controller).toBeDefined();
  });

  it('should return a list of users with metadata', async () => {
    const users: UserEntity[] = await controller.list({
      limit: 10,
      skip: 0,
      with: ['metadata'],
    });

    expect(users).toHaveLength(3);
    expect(users[0]).toHaveProperty('name');
    expect(users[0]).toHaveProperty('email');
    expect(users[0]).toHaveProperty('code');
    expect(users[0].code).toBeFalsy();
    expect(users[0].metadata).toHaveProperty('id');
    expect(users[0].metadata).toHaveProperty('id');
    expect(users[0].metadata).toHaveProperty('birthday');
    expect(users[0].metadata).toHaveProperty('image');
  });

  it('should return a list of users (without metadata)', async () => {
    const users: UserEntity[] = await controller.list({
      limit: 10,
      skip: 0,
    });

    expect(users).toHaveLength(3);
    expect(users[0].metadata).toBeFalsy();
  });
});
