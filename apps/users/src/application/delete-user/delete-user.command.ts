import { Command } from '@app/commons/application/contracts/command';
import { IsNumberString } from 'class-validator';

export class DeleteUserCommand implements Command {
  @IsNumberString()
  id: number;

  constructor(props: Partial<DeleteUserCommand>) {
    Object.assign(this, props);
  }
}
