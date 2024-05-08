import { Type } from "class-transformer";
import { IsArray, IsInt, IsOptional, ValidateNested } from "class-validator";

class PropertyDto {
    propertyType: string;
    value: string;
  }
  
  export class CreateVariantWithPropDto {
    
    @IsInt()
    productId: number;
  
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => PropertyDto)
    properties: PropertyDto[];

    @IsInt()
    @IsOptional()
    stock: number;
  }