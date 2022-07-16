import { Inject, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from 'src/entities/user.entity';
import { EmailDto } from './dto/Email.dto';

@Injectable()
export class MailService {
    @Inject(MailerService)
    mailerService: MailerService;

    async contactUs(body: EmailDto) {
        await this.mailerService.sendMail({
            to: "ersi.xhangolli@cit.edu.al",
            subject: 'Contact Us',
            template: 'confirmation', 
            context: {
                name: body.name,
                email: body.email,
                message: body.message,
            },
        });
    }
}


