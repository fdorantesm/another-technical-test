import { User } from '../user';

export interface IUserMetaDataRepository {
  persist(entity: User): Promise<void>;
}
