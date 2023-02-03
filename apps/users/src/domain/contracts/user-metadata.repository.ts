import { User } from '../user';
import { UserMetaData } from '../user-metadata';

export interface IUserMetaDataRepository {
  persist(entity: User): Promise<void>;
  getByUserId(userId: number): Promise<UserMetaData>;
}
