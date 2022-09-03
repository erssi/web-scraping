import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BasicEntity } from './basic.entity';

@Entity('job')
export class Job extends BasicEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  link: string;

  @Column()
  date: string;

  @Column()
  location: string;

  @Column({ name: 'search_location' })
  searchedLocation: string;

  @Column({ name: 'searched_title' })
  searchedTitle: string;

  @Column({ nullable: true })
  company: string;
}
