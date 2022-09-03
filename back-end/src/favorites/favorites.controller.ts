import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/entities/user.entity';
import { JobService } from 'src/job/job.service';
import { ShoppingService } from 'src/Shopping/shopping.service';
import { CurrentUser } from 'src/user/decorators/currentUser.decorator';
import { FavoriteService } from './favorites.service';

@Controller('favorites')
@UseGuards(JwtAuthGuard)
export class FavoritesController {
  @Inject(FavoriteService)
  public favoriteService: FavoriteService;

  @Inject(JobService)
  public jobService: JobService;

  @Inject(ShoppingService)
  public shoppingService: ShoppingService;

  @Get()
  async getAll(@CurrentUser() user: User) {
    const favorites = await this.favoriteService.getAll({
      user: { id: user.id },
    });

    const jobs = await Promise.all(
      favorites
        .filter((favorite) => favorite.type === 'job')
        .map(async (favorite) => {
          return await this.jobService.getOne({ id: favorite.itemId });
        }),
    );

    const shopping = await Promise.all(
      favorites
        .filter((favorite) => favorite.type === 'shopping')
        .map(async (favorite) => {
          return await this.shoppingService.getOne({ id: favorite.itemId });
        }),
    );

    return { jobs, shopping };
  }

  @Post()
  async save(@CurrentUser() user: User, @Body() body) {
    return await this.favoriteService.save({
      user,
      itemId: body.id,
      type: body.type,
    });
  }
}
