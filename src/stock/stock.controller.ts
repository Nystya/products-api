import { Body, Controller, NotFoundException, Param, Patch, Post } from '@nestjs/common';
import { CreateStockDto } from './dtos/create-stock.dto';
import { StockService } from './stock.service';
import { UpdateStockDto } from './dtos/update-stock.dto';

@Controller('stock')
export class StockController {
    constructor(private readonly stockService: StockService) {}

    @Post()
    async create(@Body() createStockDto: CreateStockDto) {
      return this.stockService.create(createStockDto);
    }
  
    @Patch(':id')
    async patch(@Param('id') id: number, @Body() updateStockDto: UpdateStockDto) {
      try {
        return await this.stockService.patch(id, updateStockDto);
      } catch (error) {
        throw new NotFoundException(error.message);
      }
    }
}
