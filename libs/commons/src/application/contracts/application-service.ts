import { Command as ICommand } from '@app/commons/application/contracts/command';

export interface IApplicationService<CommandBase extends ICommand = ICommand> {
  process<T extends CommandBase>(command: T): Promise<any>;
}
