import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserService {
@InjectRepository(User)
private readonly userRepository: Repository<User>;

    getAll(where){
        return this.userRepository.find(where);
    }

    getOne(where){
        return this.userRepository.findOne(where);
    }

    update(id, updateData){
        return this.userRepository.update(id, updateData);
    }

    delete(user){
        return this.userRepository.softRemove(user);
    }

}