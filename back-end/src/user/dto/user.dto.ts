import { Expose } from 'class-transformer';

export class UserDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  lastName: string;

  @Expose()
  email: string;

  @Expose()
  address: string;

  @Expose()
  city: string;

  @Expose()
  profile: string;

  @Expose()
  cover: string;
}
