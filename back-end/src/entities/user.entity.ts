import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BasicEntity } from './basic.entity';
import { Bookmark } from './bookmark.entity';
import { Favorites } from './favorites.entity';

@Entity('user')
export class User extends BasicEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column({ nullable: true })
  profile: string;

  @Column({ nullable: true })
  cover: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @OneToMany(() => Bookmark, (bookmark) => bookmark.user)
  bookmarks: Bookmark[];

  @OneToMany(() => Favorites, (favorites) => favorites.user)
  favorites: Favorites[];
}
