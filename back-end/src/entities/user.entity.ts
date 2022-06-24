import { Column, Entity } from "typeorm";
import { BasicEntity } from "./basic.entity";

@Entity('user')
export class User extends BasicEntity {

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    name: string;

}