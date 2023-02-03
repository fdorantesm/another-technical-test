import { Command } from '@app/commons/application/contracts/command';
import {
  IsEmail,
  IsHexadecimal,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
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

  @Matches(/[0-9a-f]{6}/)
  code: string;

  constructor(props: Partial<CreateUserCommand>) {
    Object.assign(this, props);
  }
}
