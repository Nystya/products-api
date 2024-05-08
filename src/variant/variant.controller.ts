import { Body, Controller, Get, NotFoundException, Param, ParseIntPipe, Post } from '@nestjs/common';
import { VariantService } from './variant.service';
import { Variant } from './entities/variant.entity';
import { CreateVariantWithPropDto } from './dtos/create-variant-withprop-dto';

@Controller('variant')
export class VariantController {
    constructor(private variantsService: VariantService,
    ){}

    @Get()
    async findAll(): Promise<Variant[]> {
      return await this.variantsService.findAll();
    }

    @Get('/:id')
    async findOneById(@Param('id') id: string): Promise<Variant> {
      return await this.variantsService.findOneById(parseInt(id, 10));
    }

    @Post()
    async create(@Body() categoryData: Variant): Promise<Variant> {
      return await this.variantsService.create(categoryData);
    }

    @Post('/variantsproducts') 
    async createVariant(@Body() createVariantDto: CreateVariantWithPropDto){
      try {
        const createdVariant = await this.variantsService.createVariant(createVariantDto);
        return createdVariant;
      } catch (error) {
        throw new NotFoundException(error.message);
      }
    }
}
