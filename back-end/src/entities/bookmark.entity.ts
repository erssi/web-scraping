import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BasicEntity } from './basic.entity';
import { User } from './user.entity';

@Entity('bookmark')
export class Bookmark extends BasicEntity {
  @Column({ nullable: true })
  item: string;

  @Column({ nullable: true })
  location: string;

  @ManyToOne(() => User, (user) => user.bookmarks)
  @JoinColumn()
  user: User;
}
