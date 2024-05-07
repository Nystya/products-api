import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { VariantModule } from './variant/variant.module';
import { StockModule } from './stock/stock.module';
import { CategoryModule } from './category/category.module';
import { ControllerService } from './controller/controller.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product/product.entity';
import { Category } from './category/category.entity';
import { Variant } from './variant/entities/variant.entity';
import { ProductVariantProperty } from './variant/entities/product-variant-property.entity';
import { Stock } from './stock/stock.entity';
import { VariantService } from './variant/variant.service';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'sqlite',
    database:'db.sqlite',
    entities:[Product,Category,Variant,ProductVariantProperty,Stock],
    synchronize: true,
  })
  ,ProductModule, VariantModule, StockModule, CategoryModule],
  controllers: [AppController],
  providers: [AppService, ControllerService],
})
export class AppModule {}
