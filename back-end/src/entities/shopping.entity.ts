import { Column, Entity } from "typeorm";
import { BasicEntity } from "./basic.entity";

export enum ShoppingWebsite {
    AMAZON = "amazon",
    EBAY = "ebay",
    ALIEXPRESS = "aliexpress",
  }

@Entity('shopping')
export class Shopping extends BasicEntity {

    @Column()
    description: string;

    @Column()
    price: number;

    @Column()
    rating: number;

    @Column()
    url: string;

    @Column()
    image: string;

    @Column()
    type: ShoppingWebsite
}