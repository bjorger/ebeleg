import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendTokens(tokens: string[], email: string) {
    await this.mailerService.sendMail({
      to: email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'EBS Test',
      template: './tokens_created', // `.hbs` extension is appended automatically
      context: {
        tokens,
      },
    });
  }

  async sendUserInformation(user: User) {
    const { email, id, password } = user;

    console.log(user);

    await this.mailerService.sendMail({
      to: '<ENTER EMAIL HERE>',
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'EBS Test',
      template: './user_information', // `.hbs` extension is appended automatically
      context: {
        email,
        id,
        password,
      },
    });
  }
}
