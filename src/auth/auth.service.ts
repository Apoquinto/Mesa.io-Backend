import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { UsersService } from 'src/users/users.service';
import { SignInDTO } from './dto/SignIn.dto';
import { User } from 'src/users/user.entity';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signIn(
    credentials: SignInDTO,
  ): Promise<User | NotFoundException | UnauthorizedException> {
    try {
      const foundUser = await this.usersService.getUserByName(
        credentials.username,
      );
      if (foundUser.password != credentials.password)
        return new UnauthorizedException(
          'Invalid username or password. Please check your credentials and try again.',
        );
      return foundUser;
    } catch (error) {
      if (error instanceof NotFoundException) {
        return new NotFoundException(
          'Sorry, the user you are trying to reach does not exist. Please check the username and try again.',
        );
      }
    }
  }
}
