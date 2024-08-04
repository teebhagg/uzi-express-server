import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { SubCategoryService } from './sub-category.service';
import { Prisma } from '@prisma/client';

@Controller('sub-categories')
export class SubCategoryController {
  constructor(private readonly subCategoryService: SubCategoryService) {}

  @Post()
  async create(@Body() createSubCategoryDto: Prisma.SubCategoryCreateInput) {
    // return this.subCategoryService.create(createSubCategoryDto);
    try {
      return await this.subCategoryService.create(createSubCategoryDto);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Get()
  async findAll() {
    // return this.subCategoryService.findAll();
    try {
      return await this.subCategoryService.findAll();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    // return this.subCategoryService.findOne(id);
    try {
      return await this.subCategoryService.findOne(id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateSubCategoryDto: Prisma.SubCategoryUpdateInput) {
    // return this.subCategoryService.update(id, updateSubCategoryDto);
    try {
      return await this.subCategoryService.update(id, updateSubCategoryDto);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    // return this.subCategoryService.remove(id);
    try {
      return await this.subCategoryService.remove(id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
