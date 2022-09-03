import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookmarkService } from 'src/bookmark/bookmark.service';
import { Bookmark } from 'src/entities/bookmark.entity';
import { Job } from 'src/entities/job.entity';
import { JobController } from './job.controller';
import { JobService } from './job.service';

@Module({
  imports: [TypeOrmModule.forFeature([Job, Bookmark])],
  controllers: [JobController],
  providers: [JobService, BookmarkService],
})
export class JobModule {}
