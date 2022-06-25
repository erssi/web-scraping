import { Module } from "@nestjs/common";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";
import { CurrentUserInterceptor } from "./interceptors/CurrentUserInterceptor";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UserController],
    providers: [UserService, {
      provide: APP_INTERCEPTOR,
      useClass: CurrentUserInterceptor,
    },],
  })
  export class UserModule {}