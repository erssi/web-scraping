import { IsNotEmpty } from "class-validator";

export class SearchJobDto {
  @IsNotEmpty()
  jobTitle: string;
  @IsNotEmpty()
  location: string;
}