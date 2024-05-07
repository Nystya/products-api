import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './dtos/create-product.dto';
import { CategoryService } from 'src/category/category.service';
import { CreateProductWithVariantsDto } from './dtos/create-product-withvariants.dto';
import { VariantService } from 'src/variant/variant.service';
import { StockService } from 'src/stock/stock.service';


@Injectable()
export class ProductService {

    constructor(@InjectRepository(Product) private repository : Repository<Product>,
                private categoryService: CategoryService,
                private variantService: VariantService,
                private stockService: StockService
               
            ){}

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

    async createEntireProduct(product:CreateProductWithVariantsDto): Promise<Product>{
       
        const category= await this.categoryService.findOneById(product.categoryId);
        if (!category) {
            throw new NotFoundException(`Category with ID ${product.categoryId} not found.`);
          }
        const productCreated =this.repository.create({     name: product.name,
                                                            description: product.description,
                                                            isActive: product.isActive,
                                                            categoryId: product.categoryId
                                                    })
         await this.repository.save(productCreated);

         const variant= await this.variantService.create({productId: productCreated.id});

         const stock =this.stockService.create({variantId: variant.id,
                                                quantity: product.stock
                                                })
         

        return productCreated;
    }

    async getDefaultInfo(id: number): Promise<Product> {
      
        return await this.repository.findOne({
            where: {
                id: id,
            }
        });
    }

    async getAllInfo(id: number): Promise<Product | undefined> {
        return await this.repository.findOne({
            where: { id },
            relations: ['variants', 'variants.stock']
        });
    }

}
