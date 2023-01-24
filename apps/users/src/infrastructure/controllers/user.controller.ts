import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  Param,
} from '@nestjs/common';
import { DeleteUserCommand } from '../../application/delete-user/delete-user.command';
import { DeleteUserService } from '../../application/delete-user/delete-user.service';
import { GetUserCommand } from '../../application/get-user/get-user.command';
import { GetUserService } from '../../application/get-user/get-user.service';
import { IUserSchema } from '../../domain/user';

@Controller('users')
export class UserController {
  constructor(
    private readonly getUserService: GetUserService,
    private readonly deleteUserService: DeleteUserService,
  ) {}

  @Get('/:id')
  async getById(@Param('id') id: number): Promise<IUserSchema> {
    try {
      const command = new GetUserCommand({ id });
      return this.getUserService.process(command);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  @Delete('/:id')
  async deleteById(@Param('id') id: number): Promise<void> {
    try {
      const command = new DeleteUserCommand({ id });
      await this.deleteUserService.process(command);
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
