import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from './user.entity';
import { UpdateUserDTO } from './dto/update-user.dto';
import { DataResponse } from 'src/shared/responses/DataResponse/DataResponse';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enum';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('')
  @Roles(Role.Admin)
  getAllUSers(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  getUser(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<User | HttpException> {
    return this.usersService.getUserById(id);
  }

  @Post('')
  createUser(@Body() user: CreateUserDTO): Promise<User | HttpException> {
    return this.usersService.createUser(user);
  }

  @Put(':id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: UpdateUserDTO,
  ): Promise<DataResponse<User> | HttpException> {
    return this.usersService.updateUser(id, user);
  }

  @Delete(':id')
  deleteUser(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<DataResponse<User> | HttpException> {
    return this.usersService.deleteUser(id);
  }
}
