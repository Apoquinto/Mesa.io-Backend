import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './user.entity';
import { CreateUserDTO } from './dto/create-user.dto';
import { createConflicException } from 'src/shared/exceptions/CreateConflicException';
import { createNotFoundException } from 'src/shared/exceptions/CreateNotFoundException';
import { UpdateUserDTO } from './dto/update-user.dto';
import { DataResponse } from 'src/shared/responses/DataResponse/DataResponse';
import { createDataResponse } from 'src/shared/responses/DataResponse/createDataResponse';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getUserById(id: number): Promise<User | NotFoundException> {
    const foundUser = await this.userRepository.findOne({
      where: { id },
    });
    if (!foundUser) return createNotFoundException('user', id);
    return foundUser;
  }

  async createUser(user: CreateUserDTO): Promise<User | ConflictException> {
    user.name = user.name.toLowerCase().trim();
    const foundUser = await this.userRepository.findOne({
      where: { name: user.name },
    });
    if (!foundUser) return createConflicException('user', 'name', user.name);
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  async updateUser(
    id: number,
    user: UpdateUserDTO,
  ): Promise<DataResponse<User> | NotFoundException> {
    const foundUser = await this.userRepository.findOne({
      where: { id },
    });
    if (!foundUser) return createNotFoundException('user', id);
    const updatedUser = await this.userRepository.save({
      ...foundUser,
      ...user,
    });
    return createDataResponse('user', 'updated', id, updatedUser);
  }
}
