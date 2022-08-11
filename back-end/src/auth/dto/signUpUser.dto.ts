import { Expose } from 'class-transformer';

export class SignUpUserDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  lastName: string;

  @Expose()
  accessToken: string;
}
