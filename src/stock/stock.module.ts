import { Module } from '@nestjs/common';
import { StockController } from './stock.controller';
import { StockService } from './stock.service';
import { Stock } from './stock.entity';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports:[TypeOrmModule.forFeature([Stock]),],  //VariantModule
  controllers: [StockController],
  providers: [StockService],
  exports:[StockModule]
})
export class StockModule {}
