import { IsNotEmpty } from "class-validator";

export class EmailDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    message: string;
}