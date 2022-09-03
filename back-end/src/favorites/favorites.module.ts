import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorites } from 'src/entities/favorites.entity';
import { Job } from 'src/entities/job.entity';
import { Shopping } from 'src/entities/shopping.entity';
import { JobService } from 'src/job/job.service';
import { ShoppingService } from 'src/Shopping/shopping.service';

import { FavoritesController } from './favorites.controller';
import { FavoriteService } from './favorites.service';

@Module({
  imports: [TypeOrmModule.forFeature([Favorites, Job, Shopping])],
  controllers: [FavoritesController],
  providers: [FavoriteService, JobService, ShoppingService],
})
export class FavoriteModule {}
