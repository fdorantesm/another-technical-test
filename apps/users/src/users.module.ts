import { DatabaseModule } from '@app/commons/infrastructure/database/database.module';
import { ConfigModule } from '@app/config/config.module';
import { options } from '@app/config/options/config.options';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  CREATE_USER_SERVICE,
  LIST_USERS_SERVICE,
  LIST_USERS_WITH_METADATA_SERVICE,
  S3_SERVICE,
  USER_METADATA_REPOSITORY,
  USER_REPOSITORY,
} from './application/constants/injection-tokens';
import { CreateUserService } from './application/create-user/create-user.service';
import { DeleteUserService } from './application/delete-user/delete-user.service';
import { GetUserService } from './application/get-user/get-user.service';
import { ListUsersService } from './application/list-users/list-users.service';
import { UserController } from './infrastructure/controllers/user.controller';
import { UsersController } from './infrastructure/controllers/users.controller';
import { UserEntity } from './infrastructure/domain/user.entity';
import { UserRepository } from './infrastructure/repositories/user.repository';
import { UserMetaDataRepository } from './infrastructure/repositories/user-metadata.repository';
import { UserMetaDataEntity } from './infrastructure/domain/user-metadata.entity';
import { ListUsersWithMetadataService } from './application/list-users-with-metadata/list-users-with-metadata.service';
import { S3Service } from './infrastructure/services/s3.service';

@Module({
  imports: [
    ConfigModule.forRoot(options),
    TypeOrmModule.forFeature([UserEntity, UserMetaDataEntity]),
    DatabaseModule,
  ],
  controllers: [UserController, UsersController],
  providers: [
    GetUserService,
    DeleteUserService,
    { provide: LIST_USERS_SERVICE, useClass: ListUsersService },
    {
      provide: CREATE_USER_SERVICE,
      useClass: CreateUserService,
    },
    {
      provide: LIST_USERS_WITH_METADATA_SERVICE,
      useClass: ListUsersWithMetadataService,
    },
    {
      provide: USER_REPOSITORY,
      useClass: UserRepository,
    },
    {
      provide: USER_METADATA_REPOSITORY,
      useClass: UserMetaDataRepository,
    },
    {
      provide: S3_SERVICE,
      useClass: S3Service,
    },
  ],
  exports: [USER_REPOSITORY, USER_METADATA_REPOSITORY],
})
export class UsersModule {}
