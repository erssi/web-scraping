import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Shopping } from 'src/entities/shopping.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ShoppingService {
  @InjectRepository(Shopping)
  private readonly shoppingRepository: Repository<Shopping>;

  getAll(where, order?) {
    return this.shoppingRepository.find({ where, order });
  }

  getOne(where) {
    return this.shoppingRepository.findOne({ where });
  }

  save(shopping) {
    return this.shoppingRepository.save(shopping);
  }

  delete(shopping) {
    return this.shoppingRepository.softRemove(shopping);
  }
}
