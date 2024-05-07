import { IsInt, IsNotEmpty } from "class-validator";

export class CreateVariantDto {
    @IsInt()
    productId:number
  }