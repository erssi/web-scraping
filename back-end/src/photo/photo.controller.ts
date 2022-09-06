import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('photos')
export class PhotosController {
  @Post()
  @UseInterceptors(FileInterceptor('photo', { dest: './src/uploads' }))
  uploadSingle(@UploadedFile() file) {
    return file;
  }
}
