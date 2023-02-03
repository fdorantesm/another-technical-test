import { UserMetadataAggregation } from 'apps/users/src/domain/aggregates/user-metadata';
import { User } from 'apps/users/src/domain/user';
import { UserMetaData } from 'apps/users/src/domain/user-metadata';
import { UserMetaDataEntity } from 'apps/users/src/infrastructure/domain/user-metadata.entity';

export const usersMetadata: UserMetaData[] = [
  new UserMetaData({
    id: 1,
    birthday: new Date('1983-12-09T12:00:00'),
    image: 'http://localhost:9001/default/profile.jpg',
  }),
  new UserMetaData({
    id: 2,
    birthday: new Date('2008-04-03T12:00:00'),
    image: 'http://localhost:9001/default/profile.jpg',
  }),
  new UserMetaData({
    id: 3,
    birthday: new Date('1956-11-19T12:00:00'),
    image: 'http://localhost:9001/default/profile.jpg',
  }),
];

export const users: User[] = [
  new User({
    id: 1,
    name: 'Rick Grimes',
    email: 'rick.grimes@atlanta.gov',
    metadata_id: 1,
    metadata: <UserMetaDataEntity>(<unknown>usersMetadata[0]),
  }),
  new User({
    id: 2,
    name: 'Magna',
    email: 'magna@email.com',
    metadata_id: 2,
    metadata: <UserMetaDataEntity>(<unknown>usersMetadata[1]),
  }),
  new User({
    id: 3,
    name: 'Connie',
    email: 'connie@email.com',
    metadata_id: 3,
    metadata: <UserMetaDataEntity>(<unknown>usersMetadata[2]),
  }),
];

export const usersWithMetadata: UserMetadataAggregation[] = [
  ...users.map((user) => {
    return {
      ...user.entityRoot(),
      metadata: user.metadata,
    };
  }),
];
