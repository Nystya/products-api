import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Variant } from './entities/variant.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVariantDto } from './dtos/create-variant-dto';
import { ProductVariantProperty } from './entities/product-variant-property.entity';
import { CreateVariantWithPropDto } from './dtos/create-variant-withprop-dto';

@Injectable()
export class VariantService {
    constructor(@InjectRepository(Variant)
        private  variantRepository: Repository<Variant>,@InjectRepository(ProductVariantProperty)
        private  productVariantPropertyRepository: Repository<ProductVariantProperty>){

    }

    async create(createVariantDto: CreateVariantDto){
        const variant= this.variantRepository.create(createVariantDto)
        return await this.variantRepository.save(variant)
    }

    async findAll(): Promise<Variant[]> {
        return await this.variantRepository.find();
      }

    async findOneById(id: number): Promise<Variant> {
        return await this.variantRepository.findOne({
            where: {
                id: id,
            }
        });
    }

    async createVariant(createVariantDto: CreateVariantWithPropDto): Promise<Variant> {
      try {
          const product = await this.variantRepository.findOneBy({ productId: createVariantDto.productId });
          if (!product) {
              throw new NotFoundException(`Product with ID ${createVariantDto.productId} does not exist.`);
          }

          const variant = this.variantRepository.create({
              productId: createVariantDto.productId
          });
          const savedVariant = await this.variantRepository.save(variant);

          const properties = createVariantDto.properties.map(propertyDto => {
              const productVariantProperty = this.productVariantPropertyRepository.create({
                  propertyType: propertyDto.propertyType,
                  value: propertyDto.value,
                  variantId: savedVariant.id
              });
              return productVariantProperty;
          });
            
          await this.productVariantPropertyRepository.save(properties);

          return savedVariant;
        } catch (error) {
          throw new InternalServerErrorException('Failed to create variant.', error);
        }
    }
   
}
