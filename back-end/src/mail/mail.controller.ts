import { Body, Controller, Get, Inject, Post } from "@nestjs/common";
import { EmailDto } from "./dto/Email.dto";
import { MailService } from "./mail.service";

@Controller('mail')
export class MailController {
    @Inject(MailService)
    mailService: MailService;

  @Post()
  sendContactUsEmail(@Body() body: EmailDto){
    this.mailService.contactUs(body);
  }
}