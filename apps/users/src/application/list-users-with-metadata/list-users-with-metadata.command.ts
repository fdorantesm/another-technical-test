import { Command } from '@app/commons/application/contracts/command';
import { IsArray, IsNumber, IsObject, IsString } from 'class-validator';

export class ListUsersWithMetadataCommand implements Command {
  @IsNumber()
  skip: number;

  @IsNumber()
  limit: number;

  @IsString({ each: true })
  @IsArray()
  relations: string[];

  constructor(props: Partial<ListUsersWithMetadataCommand>) {
    Object.assign(this, props);
  }
}
