import { IsInt } from "class-validator";

export class CreateVariantDto {
  
    @IsInt()
    productId:number
  }