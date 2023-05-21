import * as nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

class EmailerService {
  transporter!: nodemailer.Transporter<SMTPTransport.SentMessageInfo>;
  EMAIL = 'test.amigos.domino@gmail.com';
  PASSWORD = 'kvowkulhggvymuij';

  constructor() {
    this.initMailer();
  }

  private initMailer() {
    this.transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: this.EMAIL,
        pass: this.PASSWORD,
      },
    });
  }

  public async sendMail(to: string, data: string, subject: string) {
    await this.transporter.sendMail({
      from: this.EMAIL,
      to: to,
      subject: subject,
      html: `<h1>Gracias por comprar con nosotros</h1><br><p>Asegurate de guardar esta imagen para reclamar tu compra<p><img src="https://api.qrserver.com/v1/create-qr-code/?data=${data}&amp;size=100x100" />`,
    });
  }
}

const emailer = new EmailerService();
export default emailer;
