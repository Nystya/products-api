import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common'
import { Category } from './category.entity';
import { CategoryService } from './category.service';
import { UpdateCategoryDto } from './dtos/update-category.dto';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async findAll(): Promise<Category[]> {
    return await this.categoryService.findAll();
  }

  @Get('/:id')
  async findOneById(@Param('id') id: string): Promise<Category> {
    return await this.categoryService.findOneById(parseInt(id, 10));
  }

  @Post()
  async create(@Body() categoryData: Category): Promise<Category> {
    return await this.categoryService.create(categoryData);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() categoryData: UpdateCategoryDto): Promise<Category> {
    return await this.categoryService.update(parseInt(id, 10), categoryData);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.categoryService.delete(parseInt(id, 10));
  }
}
