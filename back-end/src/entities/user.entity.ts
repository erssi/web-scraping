import { Column, Entity } from 'typeorm';
import { BasicEntity } from './basic.entity';

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
}
