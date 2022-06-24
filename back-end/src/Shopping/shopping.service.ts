import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Shopping } from "src/entities/shopping.entity";
import { Repository } from "typeorm";

@Injectable()
export class ShoppingService {

    @InjectRepository(Shopping)
    private readonly shoppingRepository: Repository<Shopping>;

    getAll(where){
        return this.shoppingRepository.find(where);
    }

    delete(shopping){
        return this.shoppingRepository.softRemove(shopping);
    }

}