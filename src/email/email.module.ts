import { Module } from '@nestjs/common';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [EmailController],
  imports: [HttpModule],
  providers: [EmailService],
})
export class EmailModule {}
