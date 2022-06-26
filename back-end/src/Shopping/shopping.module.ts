import {  Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Shopping } from "src/entities/shopping.entity";
import { ShoppingController } from "./shopping.controller";
import { ShoppingService } from "./shopping.service";

@Module({
    imports: [TypeOrmModule.forFeature([Shopping])],
    controllers: [ShoppingController],
    providers: [ShoppingService],
  })
  export class ShoppingModule {}