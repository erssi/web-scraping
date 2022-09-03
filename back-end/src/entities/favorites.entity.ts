import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BasicEntity } from './basic.entity';
import { User } from './user.entity';

@Entity('favorites')
export class Favorites extends BasicEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  itemId: number;

  @Column()
  type: string;

  @ManyToOne(() => User, (user) => user.favorites)
  user: User;
}
