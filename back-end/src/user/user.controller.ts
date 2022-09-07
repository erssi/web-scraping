import {
  Body,
  Controller,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Serialize } from 'src/interceptor/serialize.interceptor';
import { CurrentUser } from './decorators/currentUser.decorator';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';
var multer = require('multer');

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  @Inject(UserService)
  public userService: UserService;

  @Serialize(UserDto)
  @Patch('/edit-profile/:id')
  async editProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() body,
    @UploadedFile() file,
  ) {
    await this.userService.update(id, body);

    return await this.userService.getOne({ id });
  }

  @Serialize(UserDto)
  @Post('/profile')
  @UseInterceptors(
    FileInterceptor('profile', {
      dest: './src/uploads',
      storage: multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, './public/uploads');
        },
        filename: function (req, file, cb) {
          cb(null, `${Math.random() * 53254}${file.originalname}`);
        },
      }),
    }),
  )
  async uploadProfile(@UploadedFile() file, @CurrentUser() user) {
    if (file.fieldname === 'profile') {
      await this.userService.update(user.id, {
        profile: `${file.filename}`,
      });
      return await this.userService.getOne({ id: user.id });
    }

    throw new Error('Please upload a profile picture!');
  }

  @Serialize(UserDto)
  @Post('/cover')
  @UseInterceptors(
    FileInterceptor('cover', {
      dest: './public/uploads',
      storage: multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, './public/uploads');
        },
        filename: function (req, file, cb) {
          cb(null, `${Math.random() * 53254}${file.originalname}`);
        },
      }),
    }),
  )
  async uploadCover(@UploadedFile() file, @CurrentUser() user) {
    if (file.fieldname === 'cover') {
      await this.userService.update(user.id, {
        cover: `${file.filename}`,
      });
      return await this.userService.getOne({ id: user.id });
    }

    throw new Error('Please upload a cover picture!');
  }
}
