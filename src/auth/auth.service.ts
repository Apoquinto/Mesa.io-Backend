import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from 'src/users/users.service';
import { SignInDTO } from './dto/SignIn.dto';
import { SignInResultDTO } from './dto/signInResult.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    credentials: SignInDTO,
  ): Promise<SignInResultDTO | NotFoundException | UnauthorizedException> {
    try {
      const foundUser = await this.usersService.getUserByName(
        credentials.username,
      );
      if (foundUser.password != credentials.password)
        return new UnauthorizedException(
          'Invalid username or password. Please check your credentials and try again.',
        );
      const payload = { username: foundUser.username };
      const access_token = await this.jwtService.signAsync(payload);
      return {
        access_token,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        return new NotFoundException(
          'Sorry, the user you are trying to reach does not exist. Please check the username and try again.',
        );
      }
    }
  }
}
