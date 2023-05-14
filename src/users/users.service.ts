import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './user.entity';
import { CreateUserDTO } from './dto/create-user.dto';
import { createConflicException } from 'src/shared/exceptions/CreateConflicException';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

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
