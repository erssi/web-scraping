import { MailerModule } from '@nestjs-modules/mailer'; 
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';

@Module({
    imports: [
      MailerModule.forRootAsync({
          useFactory: () => ({
            transport: {
                host: process.env.EMAIL_HOST,
                service: process.env.EMAIL_HOST,
                port: Number(process.env.EMAIL_PORT),
                ignoreTLS: false,
                secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
            },
            defaults: {
                from: `"No Reply" <${process.env.EMAIL_FROM}>`,
            },
            template: {
                dir: join(__dirname, './templates'),
                adapter: new HandlebarsAdapter(),
                options: {
                  strict: true,
                },
            },
          }),
      }),
    ],
    providers: [MailService],
    controllers: [MailController],
    exports: [MailService],
})
export class MailModule {}