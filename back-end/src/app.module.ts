import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configOptions } from 'src/config/config.service';


@Module({
  imports: [TypeOrmModule.forRoot(configOptions)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
