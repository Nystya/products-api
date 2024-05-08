import { Injectable, NotFoundException } from '@nestjs/common';
import { Category } from './category.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateCategoryDto } from './dtos/update-category.dto';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
      ) {}
    
    async findAll(): Promise<Category[]> {
        return await this.categoryRepository.find();
      }
    
      async findOneById(id: number): Promise<Category> {
        return await this.categoryRepository.findOne({
            where: {
                id: id,
            }});
      }
    
    async create(category: Category): Promise<Category>{
        const create  = this.categoryRepository.create(category);
        return await this.categoryRepository.save(create);
    }

    async update(id:number , updateCategoryDto:UpdateCategoryDto) : Promise<Category>{
      const existentCategory = await  this.categoryRepository.findOneBy({
         id: id
      })
      if(!existentCategory){
        throw new NotFoundException(`Category with the id: ${id} doesnt exist`)
      }

      Object.assign(existentCategory,updateCategoryDto)

      return this.categoryRepository.save(existentCategory);
    } 
    
    async delete(id:number){
      const categoryToBeDeleted= await  this.categoryRepository.findOneBy({
        id:id})

        if(!categoryToBeDeleted){
          throw new NotFoundException(`Category with the id: ${id} doesnt exist`)
        }
        return this.categoryRepository.remove(categoryToBeDeleted)
    }
    
}
