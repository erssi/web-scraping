import { Controller, Get, HttpService, Inject } from "@nestjs/common";
import { ShoppingService } from "./shopping.service";

@Controller('shopping')
export class ShoppingController {
    @Inject(ShoppingService)
    public shoppingService: ShoppingService;
    @Inject(HttpService)
    private readonly httpService: HttpService;

    @Get()
    async test() {
        const indeed = await this.httpService.post('http://localhost:4000/indeed-scrape', {jobTitle: 'Software Engineer', location: 'New york'}).toPromise();
        const flexjobs = await this.httpService.post('http://localhost:4000/flex-jobs-scrape', {jobTitle: 'Software Engineer', location: 'New york'}).toPromise();
        console.log({indeed: indeed.data});
        console.log({flexjobs: flexjobs.data});

        return {indeed: indeed.data, flexjobs: flexjobs.data};
        
        
        
    }
}