import { Module } from '@nestjs/common';
import { PhotosController } from './photo.controller';

@Module({
  imports: [],
  controllers: [PhotosController],
  providers: [],
})
export class PhotoModule {}
