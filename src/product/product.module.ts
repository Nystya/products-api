import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { CategoryModule } from 'src/category/category.module';
import { VariantModule } from 'src/variant/variant.module';
import { StockModule } from 'src/stock/stock.module';

@Module({
  imports:[TypeOrmModule.forFeature([Product]),CategoryModule,VariantModule,StockModule],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
