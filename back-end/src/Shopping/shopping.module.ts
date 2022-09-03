import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookmarkService } from 'src/bookmark/bookmark.service';
import { Bookmark } from 'src/entities/bookmark.entity';
import { Shopping } from 'src/entities/shopping.entity';
import { ShoppingController } from './shopping.controller';
import { ShoppingService } from './shopping.service';

@Module({
  imports: [TypeOrmModule.forFeature([Shopping, Bookmark])],
  controllers: [ShoppingController],
  providers: [ShoppingService, BookmarkService],
})
export class ShoppingModule {}
