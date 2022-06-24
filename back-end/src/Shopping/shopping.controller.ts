import { Controller, Get, HttpService, Inject } from "@nestjs/common";
import { ShoppingService } from "./shopping.service";

@Controller('shopping')
export class ShoppingController {
    @Inject(ShoppingService)
    public shoppingService: ShoppingService;
    @Inject(HttpService)
    private readonly httpService: HttpService;

    @Get()
    async test(){
        try {
            const amazon = await this.httpService.post('http://localhost:4500/amazon-scrape', {search: 'iphone 12'}).toPromise();
            const ebay = await this.httpService.post('http://localhost:4500/ebay-scrape', {search: 'iphone 12'}).toPromise();
            const aliExpres = await this.httpService.post('http://localhost:4500/aliexpress-scrape', {search: 'iphone 12'}).toPromise();
            const shopping = [];
            shopping.push(...amazon.data);
            shopping.push(...ebay.data);
            shopping.push(...aliExpres.data);

            

            await this.shoppingService.save(shopping);
            return {amazon: amazon.data, ebay: ebay.data, aliExpres: aliExpres.data};
        } catch (error) {
            return new Error('Something went wrong');
        }
    }

}