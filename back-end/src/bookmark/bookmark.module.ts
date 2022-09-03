import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bookmark } from 'src/entities/bookmark.entity';
import { Job } from 'src/entities/job.entity';
import { Shopping } from 'src/entities/shopping.entity';
import { JobService } from 'src/job/job.service';
import { ShoppingService } from 'src/Shopping/shopping.service';
import { BookmarkController } from './bookmark.controller';
import { BookmarkService } from './bookmark.service';

@Module({
  imports: [TypeOrmModule.forFeature([Bookmark, Shopping, Job])],
  controllers: [BookmarkController],
  providers: [BookmarkService, ShoppingService, JobService],
})
export class BookmarkModule {}
