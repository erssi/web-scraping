import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Job } from "src/entities/job.entity";
import { Repository } from "typeorm";

@Injectable()
export class JobService {
    @InjectRepository(Job)
    private readonly jobRepository: Repository<Job>;

    getAll(where, order?){
        return this.jobRepository.find({where, order});
    }

    save(jobs){
        return this.jobRepository.save(jobs);
    }
    
    delete(job){
        return this.jobRepository.softRemove(job);
    }
}