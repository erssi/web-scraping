import { Controller, Get, Param, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('image/:imgId')
  test(@Param('imgId') imgId, @Res() res) {
    return res.sendFile('uploads/' + imgId, { root: 'public' });
  }
}
