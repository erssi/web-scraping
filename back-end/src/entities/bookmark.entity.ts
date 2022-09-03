import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BasicEntity } from './basic.entity';
import { User } from './user.entity';

@Entity('bookmark')
export class Bookmark extends BasicEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  item: string;

  @Column({ nullable: true })
  location: string;

  @ManyToOne(() => User, (user) => user.bookmarks)
  @JoinColumn()
  user: User;
}
