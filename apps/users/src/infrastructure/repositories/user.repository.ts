import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { IUserRepository } from '../../domain/contracts/user.repository';
import { User } from '../../domain/user';
import { UserEntity } from '../domain/user.entity';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    protected readonly userRepository: Repository<UserEntity>,
  ) {}

  private createBuilder(): SelectQueryBuilder<UserEntity> {
    return this.userRepository.createQueryBuilder('user');
  }

  async persist(entity: User): Promise<void> {
    await this.userRepository.save(entity.entityRoot());
  }

  async list(): Promise<User[]> {
    const result = await this.createBuilder().getMany();

    const users = result.map((user) => new User(user));

    return users;
  }

  async getById(id: number): Promise<User> {
    const user = await this.userRepository.findOneByOrFail({ id });

    return new User(user);
  }

  async deleteById(id: number): Promise<void> {
    await this.userRepository.delete({ id });
  }
}
