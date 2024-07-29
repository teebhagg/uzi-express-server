import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { BrandsService } from './brands.service';
import { Prisma } from '@prisma/client';

@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @Post()
  async create(@Body() createBrandDto: Prisma.BrandCreateInput) {
    try {
      return await this.brandsService.create(createBrandDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('bulk')
  async bulkCreate(@Body() createBrandsDto: Prisma.BrandCreateManyInput[]) {
    try {
      return await this.brandsService.bulkCreate(createBrandsDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.brandsService.findAll();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const brand = await this.brandsService.findOne(id);
      if (!brand) {
        throw new NotFoundException("Brand doesn't exist");
      }
      return brand;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateBrandDto: Prisma.BrandUpdateInput) {
    try {
      return await this.brandsService.update(id, updateBrandDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    // return this.brandsService.remove(id);
    try {
      return await this.brandsService.remove(id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
