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

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getUserById(id: number): Promise<User | NotFoundException> {
    const foundUser = this.userRepository.findOne({
      where: { id },
    });
    if (!foundUser) return createNotFoundException('user', id);
    return foundUser;
  }

  async createUser(user: CreateUserDTO): Promise<User | ConflictException> {
    user.name = user.name.toLowerCase().trim();
    const foundUser = this.userRepository.findOne({
      where: { name: user.name },
    });
    if (!foundUser) return createConflicException('user', 'name', user.name);
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }
}
