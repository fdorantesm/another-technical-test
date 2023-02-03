import { UserEntity } from '../infrastructure/domain/user.entity';

export interface IUserSchema {
  id: number;
  name: string;
  email: string;
  code?: string;
  created_at?: Date;
  updated_at?: Date;
}

export class User {
  private _entityRoot: IUserSchema;

  constructor({
    name,
    email,
    code,
    created_at = new Date(),
    updated_at = new Date(),
    id = null,
  }: {
    name: string;
    email: string;
    code?: string;
    created_at?: Date;
    updated_at?: Date;
    id?: number;
  }) {
    this._entityRoot = new UserEntity();
    this._entityRoot.name = name;
    this._entityRoot.email = email;
    this._entityRoot.code = code;
    this._entityRoot.created_at = created_at;
    this._entityRoot.updated_at = updated_at;
    this._entityRoot.id = id;
  }

  get email(): string {
    return this._entityRoot.email;
  }

  public hydrate(root: IUserSchema): void {
    this._entityRoot = root;
  }

  public entityRoot(): IUserSchema {
    return this._entityRoot;
  }
}
