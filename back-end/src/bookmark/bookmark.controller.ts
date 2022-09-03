import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { JobService } from 'src/job/job.service';
import { ShoppingService } from 'src/Shopping/shopping.service';
import { CurrentUser } from 'src/user/decorators/currentUser.decorator';
import { BookmarkService } from './bookmark.service';
import { BookmarkSearchDto } from './dto/bookmarkSearch.dto';

@Controller('bookmark')
@UseGuards(JwtAuthGuard)
export class BookmarkController {
  @Inject(BookmarkService)
  public bookmarkService: BookmarkService;

  @Inject(ShoppingService)
  public shoppingService: ShoppingService;

  @Inject(JobService)
  public jobService: JobService;

  @Get()
  async getAll(@CurrentUser() user) {
    return await this.bookmarkService.getAll({ user: { id: user.id } });
  }

  @Post('/get-item')
  async getItem(@Body() body: BookmarkSearchDto) {
    if (!body.location) {
      return await this.shoppingService.getAll({ search: body.item });
    }

    return await this.jobService.getAll({
      title: body.item,
      location: body.location,
    });
  }
}
