import { Command } from '@app/commons/application/contracts/command';
import { IsObject } from 'class-validator';

export class ListUsersCommand implements Command {
  @IsObject()
  skip: number;
  limit: number;

  constructor(props: Partial<ListUsersCommand>) {
    Object.assign(this, props);
  }
}
