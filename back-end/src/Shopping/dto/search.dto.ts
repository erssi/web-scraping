import { IsNotEmpty } from "class-validator";

export class SearchShopDto {
    @IsNotEmpty()
    search: string;
}