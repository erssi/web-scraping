import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BasicEntity } from './basic.entity';

export enum ShoppingWebsite {
  AMAZON = 'amazon',
  EBAY = 'ebay',
  ALIEXPRESS = 'aliexpress',
}

@Entity('shopping')
export class Shopping extends BasicEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  price: string;

  @Column({ nullable: true })
  rating: string;

  @Column({ nullable: true })
  url: string;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true })
  type: ShoppingWebsite;

  @Column({ nullable: true })
  search: string;
}
