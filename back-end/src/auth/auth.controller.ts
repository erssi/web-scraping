import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Serialize } from 'src/interceptor/serialize.interceptor';
import { CurrentUser } from 'src/user/decorators/currentUser.decorator';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterUserDto } from './dto/register.dto';
import { SignUpUserDto } from './dto/signUpUser.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  @Inject(AuthService)
  private readonly authService: AuthService;
  @Inject(UserService)
  private readonly userService: UserService;
  @Inject(JwtService)
  private jwtService: JwtService;

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

  @Serialize(SignUpUserDto)
  @Post('/signup')
  async register(@Body() data: RegisterUserDto) {
    if (data.password != data.confirmPassword) {
      throw new Error('Confirm Password does not match the Password');
    }

    await this.authService.signup({ ...data });
    const user = await this.userService.getOne({ email: data.email });

    return {
      ...user,
      accessToken: this.jwtService.sign({ email: user.email, sub: user.id }),
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  async getMe(@CurrentUser() user) {
    delete user.salt, delete user.password;
    return user;
  }
}
