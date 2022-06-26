import { Controller, Get, Inject, Query, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { ShoppingWebsite } from "src/entities/shopping.entity";
import { SearchShopDto } from "./dto/search.dto";
import { ShoppingService } from "./shopping.service";
import axios from 'axios';


@Controller('shopping')
export class ShoppingController {
    @Inject(ShoppingService)
    public shoppingService: ShoppingService;

    @UseGuards(JwtAuthGuard)
    @Get('/search-login')
    async search(@Query() query: SearchShopDto) {
    
    try {
        const items = [];

        const foundItems = await this.shoppingService.getAll({search: query.search}, {createdAt: 'DESC'});
        
        if(foundItems?.length === 0 || foundItems[0]?.createdAt.getDate() <= ( new Date().getDate() - 2)){
        
            const amazon =  await axios({
                method: 'post',
                url: 'http://localhost:4500/amazon-scrape',
                headers: {
                    accept: 'application/json',
                },
                data: {search: query.search}
            })
            //  await this.httpService.post('http://localhost:4500/amazon-scrape', {search: 'iphone 12'}).toPromise();
            const ebay = await axios({
                method: 'post',
                url: 'http://localhost:4500/ebay-scrape',
                headers: {
                    accept: 'application/json',
                },
                data: {search: query.search}
            })
            // await this.httpService.post('http://localhost:4500/ebay-scrape', {search: 'iphone 12'}).toPromise();
            const aliExpres = await axios({
                method: 'post',
                url: 'http://localhost:4500/aliexpress-scrape',
                headers: {
                    accept: 'application/json',
                },
                data: {search: query.search}
            })
            //  await this.httpService.post('http://localhost:4500/aliexpress-scrape', {search: 'iphone 12'}).toPromise();
           
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
          const amazon = await axios({
            method: 'post',
            url: 'http://localhost:4500/amazon-scrape',
            headers: {
                accept: 'application/json',
            },
            data: {search: query.search}
        })
          const ebay = await axios({
            method: 'post',
            url: 'http://localhost:4500/ebay-scrape',
            headers: {
                accept: 'application/json',
            },
            data: {search: query.search}
        })
          const aliExpres = await axios({
            method: 'post',
            url: 'http://localhost:4500/aliexpress-scrape',
            headers: {
                accept: 'application/json',
            },
            data: {search: query.search}
        })
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