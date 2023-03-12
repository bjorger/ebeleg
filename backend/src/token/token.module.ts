import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token } from '../entities/token.entity';
import { TokenService } from './token.service';
import { TokenController } from './token.controller';
import { MailService } from 'src/mail/mail.service';

@Module({
  imports: [TypeOrmModule.forFeature([Token])],
  providers: [TokenService, MailService],
  controllers: [TokenController],
})
export class TokenModule {}
