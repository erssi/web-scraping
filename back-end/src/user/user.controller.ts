import { Controller, Inject } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller('user')
export class UserController {
    @Inject(UserService)
    public userService: UserService;
}