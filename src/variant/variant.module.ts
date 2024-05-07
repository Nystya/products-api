import { Module } from '@nestjs/common';
import { VariantService } from './variant.service';
import { VariantController } from './variant.controller';
import { Variant } from './entities/variant.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductVariantProperty } from './entities/product-variant-property.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Variant]),TypeOrmModule.forFeature([ProductVariantProperty])],
  providers: [VariantService],
  controllers: [VariantController],
  exports:[VariantService]
})
export class VariantModule {}
