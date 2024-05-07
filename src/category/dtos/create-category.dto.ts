import { IsNotEmpty, IsNumber, IsString } from "class-validator";



export class CreateCategory{
    
   @IsString()
   @IsNotEmpty()
    category: string;
}