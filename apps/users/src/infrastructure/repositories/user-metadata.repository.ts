import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../domain/user';
import { IUserMetaDataRepository } from '../../domain/contracts/user-metadata.repository';
import { UserMetaDataEntity } from '../domain/user-metadata.entity';
import { UserMetaData } from '../../domain/user-metadata';

@Injectable()
export class UserMetaDataRepository implements IUserMetaDataRepository {
  constructor(
    @InjectRepository(UserMetaDataEntity)
    protected readonly userMetaDataRepository: Repository<UserMetaDataEntity>,
  ) {}

  async persist(entity: User): Promise<void> {
    await this.userMetaDataRepository.save(entity.entityRoot());
  }

  async getByUserId(userId: number): Promise<UserMetaData> {
    const userMetaData = await this.userMetaDataRepository.findOneByOrFail({
      userId,
    });
    return new UserMetaData(userMetaData);
  }
}
