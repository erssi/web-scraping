import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configOptions } from 'src/config/config.service';
import { UserModule } from './user/user.module';
import { JobModule } from './job/job.module';
import { ShoppingModule } from './Shopping/shopping.module';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { BookmarkModule } from './bookmark/bookmark.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(configOptions),
    UserModule,
    JobModule,
    ShoppingModule,
    AuthModule,
    MailModule,
    BookmarkModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
