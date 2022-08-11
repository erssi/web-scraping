import {
  Body,
  Controller,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { Serialize } from 'src/interceptor/serialize.interceptor';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  @Inject(UserService)
  public userService: UserService;

  @Serialize(UserDto)
  @Patch('/edit-profile/:id')
  async editProfile(@Param('id', ParseIntPipe) id: number, @Body() body) {
    await this.userService.update(id, body);

    return await this.userService.getOne({ id });
  }
}
