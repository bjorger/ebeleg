import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
} from '@nestjs/common';
import { TokenService } from './token.service';
import { Token } from '../entities/token.entity';
import { MailService } from 'src/mail/mail.service';

@Controller('token')
export class TokenController {
  constructor(
    private readonly tokenService: TokenService,
    private readonly mailService: MailService,
  ) {}

  @Get(':n/:email')
  async generateTokens(
    @Param('n') n: number,
    @Param('email') email,
  ): Promise<string[]> {
    const tokens = await this.tokenService.getTokens(n);
    await this.mailService.sendTokens(tokens, email);
    return tokens;
  }

  @Post(':token')
  async consumeToken(
    @Param('token') token: string,
    @Body()
    body: {
      email: string;
      password: string;
      id: string;
    },
  ): Promise<Token> {
    try {
      const _token = await this.tokenService.consumeToken(token);
      await this.mailService.sendUserInformation(body);
      return _token;
    } catch (error) {
      throw new HttpException({ error: error.message }, 400);
    }
  }
}
