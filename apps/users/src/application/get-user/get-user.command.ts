import { Command } from '@app/commons/application/contracts/command';
import { IsObject } from 'class-validator';

export class GetUserCommand implements Command {
  @IsObject()
  id: number;

  constructor(props: Partial<GetUserCommand>) {
    Object.assign(this, props);
  }
}
