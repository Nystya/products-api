import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dtos/create-product.dto';
import { CreateProductWithVariantsDto } from './dtos/create-product-withvariants.dto';
import { Product } from './product.entity';

@Controller('products')
export class ProductController {
    constructor(private productsService: ProductService,
    ){}

    @Post('/createproduct')
    createProduct(@Body() productDto: CreateProductDto, @Body('categoryId', ParseIntPipe) categoryId: number){
        return this.productsService.create(productDto,categoryId)
    }

    @Post('/createentireproduct')
    create(@Body() productDto:CreateProductWithVariantsDto){
        return this.productsService.createEntireProduct(productDto);
    }

    @Get('/:id')
    async findOneById(@Param('id') id: string): Promise<Product> {
      return await this.productsService.getDefaultInfo(parseInt(id,10));
    }

    @Get('/info/:id')
    async getAllProducts(@Param('id') id: string): Promise<any> {
        try {
            const product = await this.productsService.getAllInfo(parseInt(id,10));
            if(product!=null)
                return { success: true, data: product };
            else  return { success: false, data:product };
        } catch (error) {
            console.error('Error fetching product:', error);
            return { success: false, message: 'Failed to fetch product' };
        }
    }

}



