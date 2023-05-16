import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { SignInDTO } from './dto/SignIn.dto';
import { SignUpDTO } from './dto/SingUp.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signIn')
  signIn(@Body() credentials: SignInDTO) {
    return this.authService.signIn(credentials);
  }

  @Post('signUp')
  signUp(@Body() credentials: SignUpDTO) {
    return this.authService.signUp(credentials);
  }
}
