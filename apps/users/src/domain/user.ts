import { UserMetaDataEntity } from '../infrastructure/domain/user-metadata.entity';
import { UserEntity } from '../infrastructure/domain/user.entity';
import { UserMetadataAggregation } from './aggregates/user-metadata';
import { IUserMetadataDataSchema } from './user-metadata';

export interface IUserSchema {
  id: number;
  name: string;
  email: string;
  code?: string;
  metadata_id: number;
  created_at?: Date;
  updated_at?: Date;
}

export class User {
  private _entityRoot: IUserSchema;
  private _metadata: IUserMetadataDataSchema;

  constructor({
    name,
    email,
    code,
    created_at = new Date(),
    updated_at = new Date(),
    id = null,
    metadata_id = null,
    metadata,
  }: {
    name: string;
    email: string;
    code?: string;
    metadata_id?: number;
    metadata?: UserMetaDataEntity;
    created_at?: Date;
    updated_at?: Date;
    id?: number;
  }) {
    this._entityRoot = new UserEntity();
    this._metadata = metadata;
    this._entityRoot.name = name;
    this._entityRoot.email = email;
    this._entityRoot.code = code;
    this._entityRoot.metadata_id = metadata_id;
    this._entityRoot.created_at = created_at;
    this._entityRoot.updated_at = updated_at;
    this._entityRoot.id = id;
  }

  get email(): string {
    return this._entityRoot.email;
  }

  get metadata(): IUserMetadataDataSchema {
    return this._metadata;
  }

  public hydrate(root: IUserSchema): void {
    this._entityRoot = root;
  }

  public entityRoot(): IUserSchema {
    return this._entityRoot;
  }

  public toJson(): UserMetadataAggregation {
    const root = this._entityRoot;
    return {
      id: root.id,
      name: root.name,
      email: root.email,
      code: root.code,
      metadata_id: root.metadata_id,
      metadata: this.metadata,
      created_at: this._entityRoot.created_at,
      updated_at: this._entityRoot.updated_at,
    };
  }
}
