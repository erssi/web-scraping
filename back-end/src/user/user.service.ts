import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RegisterUserDto } from "src/auth/dto/register.dto";
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserService {
@InjectRepository(User)
private readonly userRepository: Repository<User>;

    getAll(where){
        return this.userRepository.find({where});
    }

    getOne(where){
        return this.userRepository.findOne({where});
    }

    update(id, updateData){
        return this.userRepository.update(id, updateData);
    }

    delete(user){
        return this.userRepository.softRemove(user);
    }

    register(body: RegisterUserDto) {
        let savedUser;
        try {
          body.email = body.email.toLowerCase();
          const user = this.userRepository.create(body);
          savedUser = this.userRepository.save(user);
        } catch (error) {
          throw new HttpException(error.response, error.status);
        }
    
        return savedUser;
      }
}