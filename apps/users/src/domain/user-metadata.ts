import { UserMetaDataEntity } from '../infrastructure/domain/user-metadata.entity';

export interface IUserMetadataDataSchema {
  id: number;
  image: string;
  birthday: Date;
  userId: number;
  created_at?: Date;
  updated_at?: Date;
}

export class UserMetaData {
  private _entityRoot: IUserMetadataDataSchema;

  constructor({
    image,
    birthday,
    userId,
    created_at = new Date(),
    updated_at = new Date(),
    id = null,
  }: {
    image: string;
    birthday: Date;
    userId: number;
    created_at?: Date;
    updated_at?: Date;
    id?: number;
  }) {
    this._entityRoot = new UserMetaDataEntity();
    this._entityRoot.image = image;
    this._entityRoot.birthday = birthday;
    this._entityRoot.userId = userId;
    this._entityRoot.created_at = created_at;
    this._entityRoot.updated_at = updated_at;
    this._entityRoot.id = id;
  }

  public hydrate(root: IUserMetadataDataSchema): void {
    this._entityRoot = root;
  }

  public entityRoot(): IUserMetadataDataSchema {
    return this._entityRoot;
  }
}
