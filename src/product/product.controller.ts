import { Body, Controller, ParseIntPipe, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dtos/create-product.dto';

@Controller('products')
export class ProductController {
    constructor(private productsService: ProductService,
    ){}

    @Post('/createproduct')
    createProduct(@Body() productDto: CreateProductDto, @Body('categoryId', ParseIntPipe) categoryId: number){
        return this.productsService.create(productDto,categoryId)
    }

}



