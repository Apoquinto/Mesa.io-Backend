import { Body, Controller, Get, HttpException, Post } from '@nestjs/common';
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

  @Post('')
  createUser(@Body() user: CreateUserDTO): Promise<User | HttpException> {
    return this.usersService.createUser(user);
  }
}
