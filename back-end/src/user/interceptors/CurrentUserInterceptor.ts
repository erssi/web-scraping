import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Injectable,
  Inject,
} from '@nestjs/common';
import { UserService } from '../user.service';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  @Inject(UserService)
  private usersService: UserService;

  async intercept(context: ExecutionContext, handler: CallHandler) {
    const request = context.switchToHttp().getRequest();

    const { userId } = request.user || {};

    if (userId) {
      const user = await this.usersService.getOne({ id: userId });
      request.currentUser = user;
    }

    return handler.handle();
  }
}
