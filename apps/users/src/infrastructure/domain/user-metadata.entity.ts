import { BaseEntity } from '@app/commons/infrastructure/domain/base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IUserMetadataDataSchema } from '../../domain/user-metadata';

@Entity({ name: 'users_metadata' })
export class UserMetaDataEntity
  extends BaseEntity
  implements IUserMetadataDataSchema
{
  @PrimaryGeneratedColumn('increment', { unsigned: true })
  public id: number;

  @Column({
    name: 'birthday',
    type: 'date',
    nullable: true,
  })
  birthday: Date;

  @Column({
    name: 'image',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  image: string;
}
