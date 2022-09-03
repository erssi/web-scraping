import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bookmark } from 'src/entities/bookmark.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BookmarkService {
  @InjectRepository(Bookmark)
  private readonly bookmarkRepository: Repository<Bookmark>;

  getAll(where, relations?, order?) {
    return this.bookmarkRepository.find({ where, order, relations });
  }

  save(bookmark) {
    return this.bookmarkRepository.save(bookmark);
  }
}
