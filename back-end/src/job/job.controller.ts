import { Controller, Inject } from "@nestjs/common";
import { JobService } from "./job.service";

@Controller('job')
export class JobController {
    @Inject(JobService)
    public jobService: JobService;
}