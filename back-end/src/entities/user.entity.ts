import { Column, Entity, OneToMany } from 'typeorm';
import { BasicEntity } from './basic.entity';
import { Bookmark } from './bookmark.entity';

@Entity('user')
export class User extends BasicEntity {
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

  @Column()
  password: string;

  @Column()
  salt: string;

  @OneToMany(() => Bookmark, (bookmark) => bookmark.user)
  bookmarks: Bookmark[];
}
