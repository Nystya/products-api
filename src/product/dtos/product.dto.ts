import { Expose } from "class-transformer";


export class ProductDto{
    @Expose()
    id: number;
    @Expose()
    name: string;
    @Expose()
    description: string;
    @Expose()
    isActive: boolean;
    @Expose()
    categoryId: number
    
}