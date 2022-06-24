import { Controller, Get, HttpService, Inject } from "@nestjs/common";
import { JobService } from "./job.service";

@Controller('job')
export class JobController {
    @Inject(JobService)
    public jobService: JobService;
    @Inject(HttpService)
    private readonly httpService: HttpService;

    @Get()
    async test() {
    
        try {
        const indeed = await this.httpService.post('http://localhost:4000/indeed-scrape', {jobTitle: 'Software Engineer', location: 'New york'}).toPromise();
        const flexjobs = await this.httpService.post('http://localhost:4000/flex-jobs-scrape', {jobTitle: 'Software Engineer', location: 'New york'}).toPromise();
        
        const jobs = []
        jobs.push(...indeed.data);
        jobs.push(...flexjobs.data);

        await this.jobService.save(jobs);

        return {indeed: indeed.data, flexjobs: flexjobs.data};

        } catch (error) {
            return new Error('Something went wrong');
            
        }  
    }
}