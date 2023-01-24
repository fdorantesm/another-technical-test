import { DatabaseModule } from '@app/commons/infrastructure/database/database.module';
import { ConfigModule } from '@app/config/config.module';
import { options } from '@app/config/options/config.options';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { USER_REPOSITORY } from './application/constants/injection-tokens';
import { CreateUserService } from './application/create-user/create-user.service';
import { DeleteUserService } from './application/delete-user/delete-user.service';
import { GetUserService } from './application/get-user/get-user.service';
import { ListUsersService } from './application/list-users/list-users.service';
import { UserController } from './infrastructure/controllers/user.controller';
import { UsersController } from './infrastructure/controllers/users.controller';
import { UserEntity } from './infrastructure/domain/user.entity';
import { UserRepository } from './infrastructure/repositories/user.repository';

@Module({
  imports: [
    ConfigModule.forRoot(options),
    TypeOrmModule.forFeature([UserEntity]),
    DatabaseModule,
  ],
  controllers: [UserController, UsersController],
  providers: [
    CreateUserService,
    ListUsersService,
    GetUserService,
    DeleteUserService,
    {
      provide: USER_REPOSITORY,
      useClass: UserRepository,
    },
  ],
  exports: [USER_REPOSITORY],
})
export class UsersModule {}
