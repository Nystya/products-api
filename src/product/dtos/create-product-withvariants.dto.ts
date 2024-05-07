// create-product-with-variants.dto.ts
import { IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateVariantDto } from 'src/variant/dtos/create-variant-dto';

export class CreateProductWithVariantsDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  categoryId: number;

  @IsNotEmpty()
 @ValidateNested()
  @Type(() => CreateVariantDto)
  variantWithStock: CreateVariantDto;
}
