import { Controller, Get, HttpService, Inject, Query, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { ShoppingWebsite } from "src/entities/shopping.entity";
import { SearchShopDto } from "./dto/search.dto";
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

    @UseGuards(JwtAuthGuard)
    @Get('/search-login')
    async search(@Query() query: SearchShopDto) {
    
    try {
        const items = [];

        const foundItems = await this.shoppingService.getAll({search: query.search}, {createdAt: 'DESC'});
        
        if(foundItems?.length === 0 || foundItems[0]?.createdAt.getDate() <= ( new Date().getDate() - 2)){
        
            const amazon = await this.httpService.post('http://localhost:4500/amazon-scrape', {search: 'iphone 12'}).toPromise();
            const ebay = await this.httpService.post('http://localhost:4500/ebay-scrape', {search: 'iphone 12'}).toPromise();
            const aliExpres = await this.httpService.post('http://localhost:4500/aliexpress-scrape', {search: 'iphone 12'}).toPromise();
           
            items.push(...amazon.data);
            items.push(...ebay.data);
            items.push(...aliExpres.data);
  
            items.forEach(item => {
                item.search = query.search;
            })

            if (foundItems?.length > 0) {
                await this.shoppingService.save(items);
            }

            await this.shoppingService.save(items);

            return {amazon: amazon.data, ebay: ebay.data, aliExpres: aliExpres.data};
                
            }

        return {
            amazon: foundItems.filter(item => item.type === ShoppingWebsite.AMAZON),
            ebay: foundItems.filter(item => item.type === ShoppingWebsite.EBAY),
            aliExpres: foundItems.filter(item => item.type === ShoppingWebsite.ALIEXPRESS)
        };

        } catch (error) {
            return new Error('Something went wrong');
            
    }
}


    @Get('/search')
    async searchAll(@Query() query: SearchShopDto) {
        try{
          const amazon = await this.httpService.post('http://localhost:4500/amazon-scrape', {search: query.search}).toPromise();
          const ebay = await this.httpService.post('http://localhost:4500/ebay-scrape', {search: query.search}).toPromise();
          const aliExpres = await this.httpService.post('http://localhost:4500/aliexpress-scrape', {search: query.search}).toPromise();
          const shopping = [];
          shopping.push(...amazon.data);
          shopping.push(...ebay.data);
          shopping.push(...aliExpres.data);

          shopping.forEach(item => {
              item.search = query.search;
          })

          const foundItems = await this.shoppingService.getAll({search: query.search});

          if(foundItems?.length === 0){
              await this.shoppingService.save(shopping);
          } else {
            await this.shoppingService.delete(shopping);
            await this.shoppingService.save(shopping);
         }
         return {amazon: amazon.data, ebay: ebay.data, aliExpres: aliExpres.data};

        } catch (error) {
            return new Error('Something went wrong');
        }

    }

}