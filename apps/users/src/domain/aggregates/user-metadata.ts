import { IUserSchema } from '../user';
import { IUserMetadataDataSchema } from '../user-metadata';

export type UserMetadataAggregation = IUserSchema & {
  metadata: IUserMetadataDataSchema;
};
