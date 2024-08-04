import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CategoryService } from './categories.service';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async create(@Body() createCategoryDto: Prisma.CategoryCreateInput) {
    try {
      return await this.categoryService.create(createCategoryDto);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Post('bulk')
  async bulkCreate(
    @Body() createCategoriesDto: Prisma.CategoryCreateManyInput[],
  ) {
    try {
      return await this.categoryService.bulkCreate(createCategoriesDto);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.categoryService.findAll();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.categoryService.findOne(id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: Prisma.CategoryUpdateInput,
  ) {
    try {
      return await this.categoryService.update(id, updateCategoryDto);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.categoryService.remove(id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
