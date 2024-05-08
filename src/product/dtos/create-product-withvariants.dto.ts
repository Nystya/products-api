import { IsBoolean, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';


export class CreateProductWithVariantsDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsBoolean()
  isActive: boolean;

  @IsNotEmpty()
  @IsNumber()
  categoryId: number;

  @IsNumber()
  @Min(0)
  stock: number
}
