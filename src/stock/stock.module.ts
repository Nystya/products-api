import { Module } from '@nestjs/common';
import { StockController } from './stock.controller';
import { StockService } from './stock.service';
import { Stock } from './stock.entity';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports:[TypeOrmModule.forFeature([Stock])],
  controllers: [StockController],
  providers: [StockService],
  exports:[StockService]
})
export class StockModule {}
