import { Command } from '@app/commons/application/contracts/command';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserCommand implements Command {
  @IsString()
  @MaxLength(255)
  @MinLength(2)
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsOptional()
  @MaxLength(1200)
  bio: string;

  constructor(props: Partial<CreateUserCommand>) {
    Object.assign(this, props);
  }
}
