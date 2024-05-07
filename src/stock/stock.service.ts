import { Injectable, NotFoundException } from '@nestjs/common';
import { Stock } from './stock.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateStockDto } from './dtos/update-stock.dto';
import { CreateStockDto } from './dtos/create-stock.dto';

@Injectable()
export class StockService {

    constructor(@InjectRepository(Stock)private  stockRepository: Repository<Stock>){

    }

    async create(createStockDto:CreateStockDto){
        const prod = this.stockRepository.create(createStockDto);
        return await this.stockRepository.save(prod);
    }

    async patch(id:number , UpdateStockDto:UpdateStockDto){
       
        const stock=await this.stockRepository.findOneBy({variantId:id})
        if(!stock){
            throw new NotFoundException(`Variant with id: ${id} couldnt been found!`)
        }
        stock.quantity=UpdateStockDto.quantity;

       return  await this.stockRepository.save(stock);

    }
    


}
