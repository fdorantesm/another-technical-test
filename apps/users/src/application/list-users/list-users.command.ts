import { Command } from '@app/commons/application/contracts/command';
import { IsNumber, IsObject } from 'class-validator';

export class ListUsersCommand implements Command {
  @IsNumber()
  skip: number;

  @IsNumber()
  limit: number;

  constructor(props: Partial<ListUsersCommand>) {
    Object.assign(this, props);
  }
}
