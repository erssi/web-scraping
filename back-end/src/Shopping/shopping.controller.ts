import { Controller, Get, Inject, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ShoppingWebsite } from 'src/entities/shopping.entity';
import { SearchShopDto } from './dto/search.dto';
import { ShoppingService } from './shopping.service';
import axios from 'axios';
import { BookmarkService } from 'src/bookmark/bookmark.service';
import { CurrentUser } from 'src/user/decorators/currentUser.decorator';

@Controller('shopping')
export class ShoppingController {
  @Inject(ShoppingService)
  public shoppingService: ShoppingService;

  @Inject(BookmarkService)
  public bookmarkService: BookmarkService;

  @UseGuards(JwtAuthGuard)
  @Get('/search-login')
  async search(@Query() query: SearchShopDto, @CurrentUser() user) {
    try {
      const items = [];

      const foundItems = await this.shoppingService.getAll(
        { search: query.search },
        { createdAt: 'DESC' },
      );

      if (
        foundItems?.length === 0 ||
        foundItems[0]?.createdAt.getDate() <= new Date().getDate() - 2
      ) {
        const [amazon, ebay] = await Promise.all([
          await axios.post(
            'http://localhost:4500/amazon-scrape',
            { search: query.search },
            {
              headers: {
                accept: 'application/json',
              },
            },
          ),
          await axios.post(
            'http://localhost:4500/ebay-scrape',
            { search: query.search },
            {
              headers: {
                accept: 'application/json',
              },
            },
          ),
        ]);

        items.push(...amazon.data);
        items.push(...ebay.data);

        items.forEach((item) => {
          item.search = query.search;
        });

        await this.shoppingService.save(items);

        await this.bookmarkService.save({ user, item: query.search });

        return { amazon: amazon.data, ebay: ebay.data };
      }

      return {
        amazon: foundItems.filter(
          (item) => item.type === ShoppingWebsite.AMAZON,
        ),
        ebay: foundItems.filter((item) => item.type === ShoppingWebsite.EBAY),
      };
    } catch (error) {
      return new Error('Something went wrong');
    }
  }

  @Get('/search')
  async searchAll(@Query() query: SearchShopDto) {
    try {
      const [amazon, ebay] = await Promise.all([
        await axios.post(
          'http://localhost:4500/amazon-scrape',
          { search: query.search },
          {
            headers: {
              accept: 'application/json',
            },
          },
        ),
        await axios.post(
          'http://localhost:4500/ebay-scrape',
          { search: query.search },
          {
            headers: {
              accept: 'application/json',
            },
          },
        ),
      ]);

      const shopping = [];
      shopping.push(...amazon.data);
      shopping.push(...ebay.data);

      shopping.forEach((item) => {
        item.search = query.search;
      });

      const foundItems = await this.shoppingService.getAll({
        search: query.search,
      });

      if (foundItems?.length === 0) {
        await this.shoppingService.save(shopping);
      } else {
        await this.shoppingService.delete(foundItems);
        await this.shoppingService.save(shopping);
      }
      return { amazon: amazon.data, ebay: ebay.data };
    } catch (error) {
      return new Error('Something went wrong');
    }
  }

  @Get('/test')
  async test(@Query() query: SearchShopDto) {
    return (
      await axios.post(
        'http://localhost:4500/aliexpress-scrape',

        { search: query.search },
        {
          headers: {
            accept: 'application/json',
          },
        },
      )
    ).data;
  }
}
