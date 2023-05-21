import { Body, Controller, Post } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailDTO } from './dto/email.dto';

@Controller('email')
export class EmailController {
  constructor(private emailService: EmailService) {}

  @Post('')
  sendEmail(@Body() email: EmailDTO) {
    this.emailService.sendEmail(email);
  }
}
