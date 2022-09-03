import { Controller, Get, Inject, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { SearchJobDto } from './dto/searchJob.dto';
import { JobService } from './job.service';
import axios from 'axios';
import { BookmarkService } from 'src/bookmark/bookmark.service';
import { CurrentUser } from 'src/user/decorators/currentUser.decorator';

@Controller('job')
export class JobController {
  @Inject(JobService)
  public jobService: JobService;

  @Inject(BookmarkService)
  public bookmarkService: BookmarkService;

  @UseGuards(JwtAuthGuard)
  @Get('/search-login')
  async search(@Query() query: SearchJobDto, @CurrentUser() user) {
    try {
      const jobs = [];

      const savedJobs = await this.jobService.getAll(
        { searchedTitle: query.jobTitle, searchedLocation: query.location },
        { createdAt: 'DESC' },
      );
      if (
        savedJobs?.length === 0 ||
        savedJobs[0]?.createdAt.getDate() <= new Date().getDate() - 2
      ) {
        const [indeed, flexjobs] = await Promise.all([
          await axios.post(
            'http://localhost:4000/indeed-scrape',
            {
              jobTitle: query.jobTitle,
              location: query.location,
            },
            {
              headers: {
                accept: 'application/json',
              },
            },
          ),
          await axios.post(
            'http://localhost:4000/flex-jobs-scrape',
            {
              jobTitle: query.jobTitle,
              location: query.location,
            },
            {
              headers: {
                accept: 'application/json',
              },
            },
          ),
        ]);

        jobs.push(...indeed.data);
        jobs.push(...flexjobs.data);
        jobs.forEach((job) => {
          job.searchedLocation = query.location;
          job.searchedTitle = query.jobTitle;
        });

        if (savedJobs?.length > 0) {
          await this.jobService.delete(savedJobs);
        }

        await this.jobService.save(jobs);
        await this.bookmarkService.save({
          user,
          item: query.jobTitle,
          location: query.location,
        });
        return { indeed: indeed.data, flexjobs: flexjobs.data };
      }

      return {
        indeed: savedJobs.filter(
          (job) =>
            job.searchedTitle === query.jobTitle &&
            job.searchedLocation === query.location,
        ),
        flexjobs: savedJobs.filter(
          (job) =>
            job.searchedTitle === query.jobTitle &&
            job.searchedLocation === query.location,
        ),
      };
    } catch (error) {
      throw new Error('Something went wrong');
    }
  }

  @Get('/search')
  async searchAll(@Query() query: SearchJobDto) {
    try {
      const [indeed, flexjobs] = await Promise.all([
        await axios.post(
          'http://localhost:4000/indeed-scrape',
          {
            jobTitle: query.jobTitle,
            location: query.location,
          },
          {
            headers: {
              accept: 'application/json',
            },
          },
        ),
        await axios.post(
          'http://localhost:4000/flex-jobs-scrape',
          {
            jobTitle: query.jobTitle,
            location: query.location,
          },
          {
            headers: {
              accept: 'application/json',
            },
          },
        ),
      ]);

      const jobs = [];
      jobs.push(...indeed.data);
      jobs.push(...flexjobs.data);
      jobs.forEach((job) => {
        job.searchedLocation = query.location;
        job.searchedTitle = query.jobTitle;
      });

      const savedJobs = await this.jobService.getAll(
        { searchedTitle: query.jobTitle, searchedLocation: query.location },
        { createdAt: 'DESC' },
      );

      if (savedJobs?.length === 0) {
        await this.jobService.save(jobs);
      } else {
        await this.jobService.delete(savedJobs);
        await this.jobService.save(jobs);
      }

      return { indeed: indeed.data, flexjobs: flexjobs.data };
    } catch (error) {
      throw new Error('Something went wrong');
    }
  }
}
