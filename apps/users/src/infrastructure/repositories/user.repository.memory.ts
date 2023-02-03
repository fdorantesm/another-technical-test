import { Injectable } from '@nestjs/common';
import { users, usersWithMetadata } from 'test/mocks/users.mock';
import { IUserRepository } from '../../domain/contracts/user.repository';
import { User } from '../../domain/user';
import { UserMetaData } from '../../domain/user-metadata';

@Injectable()
export class UserMemoryRepository implements IUserRepository {
  persist(entity: User): Promise<void> {
    throw new Error('Method not implemented.');
  }
  async list(page: number, limit: number): Promise<User[]> {
    return users;
  }

  async listWithRelations(
    page: number,
    limit: number,
    relations: string[],
  ): Promise<User[]> {
    const users = usersWithMetadata.map((user) => {
      const metadata = (user.metadata as unknown as UserMetaData).entityRoot();
      const userInstance = new User({
        name: user.name,
        email: user.email,
        code: user.code,
        metadata_id: user.metadata_id,
        metadata: {
          birthday: metadata.birthday,
          image: metadata.image,
          id: metadata.id,
          created_at: metadata.created_at,
          updated_at: metadata.updated_at,
        },
      });
      return userInstance;
    });
    return users;
  }

  getById(id: number): Promise<User> {
    throw new Error('Method not implemented.');
  }

  deleteById(id: number): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
