import { BaseEntity } from '@app/commons/infrastructure/domain/base.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IUserSchema } from '../../domain/user';
import { UserMetaDataEntity } from './user-metadata.entity';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity implements IUserSchema {
  @PrimaryGeneratedColumn('increment', { unsigned: true })
  public id: number;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 150,
    nullable: true,
  })
  name: string;

  @Column({
    name: 'email',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  email: string;

  @Column({
    name: 'code',
    type: 'varchar',
    length: 6,
    nullable: true,
    unique: true,
  })
  code?: string;

  @Column({
    name: 'metadata_id',
    type: 'integer',
    nullable: false,
    unique: true,
  })
  metadata_id: number;

  @OneToOne(() => UserMetaDataEntity)
  @JoinColumn({ referencedColumnName: 'id', name: 'metadata_id' })
  metadata: UserMetaDataEntity;
}
