import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateProductDto{

    @IsString()
    @IsNotEmpty()
    name: string;
    @IsString()
    @IsNotEmpty()s
    description: string;
    @IsBoolean()
    isActive: boolean;
    @IsNotEmpty()
    @IsNumber()
    categoryId: number;
}