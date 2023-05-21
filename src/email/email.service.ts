import { Injectable } from '@nestjs/common';
import { EmailDTO } from './dto/email.dto';
import emailer from './email.support';

@Injectable()
export class EmailService {
  async sendEmail(email: EmailDTO) {
    console.log(email);
    await emailer.sendMail(email.email, '1234', 'Compra exitosa');
  }
}
