import { Controller, Get, Inject, Query, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { SearchJobDto } from "./dto/searchJob.dto";
import { JobService } from "./job.service";
import axios from 'axios';

@Controller('job')
export class JobController {
    @Inject(JobService)
    public jobService: JobService;



    @UseGuards(JwtAuthGuard)
    @Get('/search-login')
    async search(@Query() query: SearchJobDto) {
        try {
            const jobs = []
            
            const savedJobs = await this.jobService.getAll({searchedTitle: query.jobTitle, searchedLocation: query.location}, {createdAt: 'DESC'});
            if(savedJobs?.length === 0 || savedJobs[0]?.createdAt.getDate() <= ( new Date().getDate() - 2)){
               const indeed = await axios({
                    method: 'post',
                    url: 'http://127.0.0.1:4000/indeed-scrape',
                    headers: {
                        accept: 'application/json',
                    },
                    data: {
                        jobTitle: query.jobTitle,
                        location: query.location
                    }
               })
               const flexjobs = await axios({
                    method: 'post',
                    url: 'http://127.0.0.1:4000/flex-jobs-scrape',
                    headers: {
                        accept: 'application/json',
                    },
                    data: {
                        jobTitle: query.jobTitle,
                        location: query.location
                    }
               }) 
                
                
                jobs.push(...indeed.data);
                jobs.push(...flexjobs.data);
                jobs.forEach(job => {
                    job.searchedLocation = query.location;
                    job.searchedTitle = query.jobTitle;
                })

                if(savedJobs?.length > 0){
                    await this.jobService.delete(savedJobs);
                }

                await this.jobService.save(jobs);
                return {indeed: indeed.data, flexjobs: flexjobs.data};
            }
    
            return {
                indeed: savedJobs.filter(job => job.searchedTitle === query.jobTitle && job.searchedLocation === query.location),
                flexjobs: savedJobs.filter(job => job.searchedTitle === query.jobTitle && job.searchedLocation === query.location)
            };
            } catch (error) {                
                throw new Error('Something went wrong');
            }  
    }

    @Get('/search')
    async searchAll(@Query() query: SearchJobDto) {
    
        try {

            let indeed;
            let flexjobs;
            
            await Promise.all([
                indeed = await axios({
                    method: 'post',
                    url: 'http://127.0.0.1:4000/indeed-scrape',
                    headers: {
                        accept: 'application/json',
                    },
                    data: {
                        jobTitle: query.jobTitle,
                        location: query.location
                    }
                }),
                flexjobs = await axios({
                    method: 'post',
                    url: 'http://127.0.0.1:4000/flex-jobs-scrape',
                    headers: {
                        accept: 'application/json',
                    },
                    data: {
                        jobTitle: query.jobTitle,
                        location: query.location
                    }
                })
            ]);


            
            
                
            const jobs = [];
            jobs.push(...indeed.data);
            jobs.push(...flexjobs.data);
            jobs.forEach(job => {
                    job.searchedLocation = query.location;
                    job.searchedTitle = query.jobTitle;
            })
                
            const savedJobs = await this.jobService.getAll({searchedTitle: query.jobTitle, searchedLocation: query.location}, {createdAt: 'DESC'});
            
            if(savedJobs?.length === 0){
                await this.jobService.save(jobs);
            } else {
                await this.jobService.delete(savedJobs);
                await this.jobService.save(jobs);
            }
                
            return {indeed: indeed.data, flexjobs: flexjobs.data};
        } catch (error) {            
            throw new Error('Something went wrong');
            
        }
    }

}