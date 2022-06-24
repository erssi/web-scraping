import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Job } from "src/entities/job.entity";
import { Repository } from "typeorm";

@Injectable()
export class JobService {
    @InjectRepository(Job)
    private readonly jobRepository: Repository<Job>;

    getAll(where){
        return this.jobRepository.find(where);
    }

    save(jobs){
        return this.jobRepository.save(jobs);
    }
    
    delete(user){
        return this.jobRepository.softRemove(user);
    }
}