import { UserEntity } from 'apps/users/src/infrastructure/domain/user.entity';
import { DataSource } from 'typeorm';
import { PromisePool } from '@supercharge/promise-pool';
import { Seeder } from 'typeorm-extension';
import * as faker from 'faker';
import { User } from 'apps/users/src/domain/user';
import { UserMetaDataEntity } from 'apps/users/src/infrastructure/domain/user-metadata.entity';
import { UserMetaData } from 'apps/users/src/domain/user-metadata';
import { randomString } from 'utility';

export default class UserSeeder implements Seeder {
  private rows = 10000;

  public async run(dataSource: DataSource): Promise<void> {
    const userRepository = dataSource.getRepository(UserEntity);
    const userMetaDataRepository = dataSource.getRepository(UserMetaDataEntity);

    const users = Array.from(Array(this.rows).keys()).map(() => {
      const firstName = faker.name.firstName();
      const lastName = faker.name.lastName();
      const image = faker.internet.avatar();
      const birthday = faker.date.past(65);
      return {
        name: `${firstName} ${lastName}`,
        email: faker.internet.email(firstName, lastName).toLowerCase(),
        code: randomString(6, '0123456789abcdef'),
        metadata: {
          image,
          birthday,
        },
      };
    });

    try {
      await PromisePool.withConcurrency(10)
        .for(users)
        .process(async (person) => {
          const user = new User({
            name: person.name,
            email: person.email,
            code: person.code,
          });
          const {
            raw: [result],
          } = await userRepository.insert(user.entityRoot());
          const userMetaData = new UserMetaData({
            image: person.metadata.image,
            birthday: person.metadata.birthday,
            userId: result.id,
          });
          await userMetaDataRepository.insert(userMetaData.entityRoot());
        });
    } catch (error) {
      console.error('UserSeeder Error', error);
    }
  }
}
