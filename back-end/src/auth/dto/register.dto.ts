import { ValidateIf, IsNotEmpty, IsString, IsEmail, MinLength, MaxLength, Matches } from "class-validator";

export class RegisterUserDto {
    @ValidateIf((o) => o.name === '')
    @IsNotEmpty()
    @IsString()
    name: string;
  
    @ValidateIf((o) => o.email === '')
    @IsNotEmpty()
    @IsEmail()
    email: string;

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

    salt: string
}