import { IsOptional, IsString } from 'class-validator';

export class BookmarkSearchDto {
  @IsOptional()
  @IsString()
  item: string;

  @IsOptional()
  @IsString()
  location: string;
}
