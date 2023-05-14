import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('')
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
}
