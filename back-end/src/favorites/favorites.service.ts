import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Favorites } from 'src/entities/favorites.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FavoriteService {
  @InjectRepository(Favorites)
  private readonly favoritesRepository: Repository<Favorites>;

  getAll(where, relations?, order?) {
    return this.favoritesRepository.find({ where, order, relations });
  }

  save(favorites) {
    return this.favoritesRepository.save(favorites);
  }
}
