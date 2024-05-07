import { IsString } from "class-validator";


export class UpdateCategoryDto{

    @IsString()
    category: string;

}