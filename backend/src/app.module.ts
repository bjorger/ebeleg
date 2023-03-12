import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token } from './entities/token.entity';
import { TokenService } from './token/token.service';
import { TokenController } from './token/token.controller';
import { TokenModule } from './token/token.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'path/to/database.sqlite',
      entities: [Token],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Token]),
    TokenModule,
    MailModule,
  ],
  providers: [TokenService],
  controllers: [TokenController],
})
export class AppModule {}
