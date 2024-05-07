import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './dtos/create-product.dto';
import { CategoryService } from 'src/category/category.service';

@Injectable()
export class ProductService {
    constructor(@InjectRepository(Product) private repository : Repository<Product>,
    private categoryService: CategoryService){}

    async create(product: CreateProductDto, categoryId: number): Promise<Product>{

        const category= await this.categoryService.findOneById(categoryId);
        if (!category) {
            throw new NotFoundException(`Category with ID ${categoryId} not found.`);
          }
      
        const newProduct = new Product();
        newProduct.name = product.name;
        newProduct.description = product.description;
        newProduct.isActive = product.isActive;
        newProduct.categoryId=categoryId;
        const prod = this.repository.create(newProduct);
        return await this.repository.save(prod);

    }

}
