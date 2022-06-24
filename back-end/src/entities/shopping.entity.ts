import { Column, Entity } from "typeorm";
import { BasicEntity } from "./basic.entity";

export enum ShoppingWebsite {
    AMAZON = "amazon",
    EBAY = "ebay",
    ALIEXPRESS = "aliexpress",
  }

@Entity('shopping')
export class Shopping extends BasicEntity {

    @Column({nullable: true})
    description: string;

    @Column({nullable: true})
    price: number;

    @Column({nullable: true})
    rating: number;

    @Column({nullable: true})
    url: string;

    @Column({nullable: true})
    image: string;

    @Column({nullable: true})
    type: ShoppingWebsite
}