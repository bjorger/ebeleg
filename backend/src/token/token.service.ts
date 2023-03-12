import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Token } from '../entities/token.entity';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
  ) {}

  async generateToken(): Promise<string> {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < 12; i++) {
      token += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    const newToken = await this.tokenRepository.create({
      token,
      creationTimestamp: new Date().toISOString(),
    });
    await this.tokenRepository.save(newToken);
    return token;
  }

  async getTokens(n: number): Promise<string[]> {
    const tokens = [];
    for (let i = 0; i < n; i++) {
      const token = await this.generateToken();
      tokens.push(token);
    }
    return tokens;
  }

  async getAllTokens(): Promise<Token[]> {
    return await this.tokenRepository.find();
  }

  async getToken(token: string): Promise<Token> {
    const _token = await this.tokenRepository.findOneBy({ token });
    return _token;
  }

  async consumeToken(token: string): Promise<Token> {
    const _token = await this.getToken(token);
    if (!_token) {
      throw new Error("Token doesn't exist");
    }

    if (_token.consumed) {
      throw new Error('Token already consumed');
    }

    const timestamp = new Date(_token.creationTimestamp);
    const numberOfDaysToAdd = 30;
    const compareTimestamp = new Date(
      timestamp.setDate(timestamp.getDate() + numberOfDaysToAdd),
    );

    if (timestamp > compareTimestamp) {
      throw new Error('Token expired');
    }

    _token.consumed = true;

    const updatedToken = await this.tokenRepository.save(_token);

    return updatedToken;
  }
}
