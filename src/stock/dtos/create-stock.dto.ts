import { IsInt, IsNumber, Min } from "class-validator";

export class CreateStockDto{
    @IsNumber()
    variantId: number;
    @IsInt()
    @Min(0)
    quantity: number;
}