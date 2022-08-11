import {
  IsNotEmpty,
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';

export class RegisterUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(20)
  // Regex validates if password contains at least
  // 1 uppercase letter,
  // 1 lowercase letter,
  // 1 number,
  // 1 special character
  @Matches(
    /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z])(?=.*[-+_!@#$%^&*.,?]).+$/,
    {
      message: 'password too weak',
    },
  )
  password: string;

  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(20)
  confirmPassword: string;

  salt: string;
}
