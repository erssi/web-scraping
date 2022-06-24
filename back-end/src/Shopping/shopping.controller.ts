import { Controller, Get, HttpService, Inject } from "@nestjs/common";
import { ShoppingService } from "./shopping.service";

@Controller('shopping')
export class ShoppingController {
    @Inject(ShoppingService)
    public shoppingService: ShoppingService;
    @Inject(HttpService)
    private readonly httpService: HttpService;


}