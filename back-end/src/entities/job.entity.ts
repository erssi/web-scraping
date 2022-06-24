import { Column, Entity } from "typeorm";
import { BasicEntity } from "./basic.entity";

@Entity('job')
export class Job extends BasicEntity{

    @Column()
    title: string;

    @Column()
    link: string;

    @Column()
    date: string;

    @Column()
    location: string;

    @Column({nullable: true})
    company: string;

}