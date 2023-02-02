import { UserEntity } from 'apps/users/src/infrastructure/domain/user.entity';
import { DataSource } from 'typeorm';
import { PromisePool } from '@supercharge/promise-pool';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import * as faker from 'faker';
import { User } from 'apps/users/src/domain/user';

export default class UserSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(UserEntity);
    const users = Array.from(Array(10000).keys()).map(() => {
      const firstName = faker.name.firstName();
      const lastName = faker.name.lastName();
      return {
        name: `${firstName} ${lastName}`,
        email: faker.internet.email(firstName, lastName).toLowerCase(),
        bio: faker.lorem.sentence(),
      };
    });

    try {
      await PromisePool.withConcurrency(10)
        .for(users)
        .process(async (userData) => {
          const user = new User(userData);
          await repository.insert(user.entityRoot());
        });
    } catch (error) {
      console.error('UserSeeder Error', error);
    }
  }
}
