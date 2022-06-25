import { Body, Controller, Inject, Post, Res, UseGuards } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { RegisterUserDto } from "./dto/register.dto";
import { LocalAuthGuard } from "./guards/local-auth.guard";

@Controller('auth')
export class AuthController {
    @Inject(AuthService)
    private readonly authService: AuthService;
    @Inject(UserService)
    private readonly userService: UserService;


    @UseGuards(LocalAuthGuard)
    @Post('/login')
    async login(@Body() loginDto: LoginDto) {
      const user = await this.userService.getOne({
        email: loginDto.email.toLowerCase(),
      });
  
      if (!user) {
        return new Error('User not found');
      }
  
      const data = await this.authService.login(loginDto);
  
      return data;
    }



  @Post('/signup')
  async register(@Body() data: RegisterUserDto) {    
    if (data.password != data.confirmPassword) {
      return new Error('Confirm Password does not match the Password');
    }

    await this.authService.signup({ ...data });
    const user = await this.userService.getOne({ email: data.email });

    return user;
  }
}