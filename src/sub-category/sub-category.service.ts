import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class SubCategoryService {
  constructor(private readonly databaseService: DatabaseService) {}

  create(createSubCategoryDto: Prisma.SubCategoryCreateInput) {
    return this.databaseService.subCategory.create({ data: createSubCategoryDto });
  }

  // bulkCreate(createSubCategoriesDto: Prisma.SubCategoryCreateInput[]) {
  //   return this.databaseService.subCategory.createMany({ data: createSubCategoriesDto });
  // }

  findAll() {
    return this.databaseService.subCategory.findMany();
  }

  findOne(id: string) {
    return this.databaseService.subCategory.findUnique({ where: { id } });
  }

  update(id: string, updateSubCategoryDto: Prisma.SubCategoryUpdateInput) {
    return this.databaseService.subCategory.update({
      where: { id },
      data: updateSubCategoryDto,
    });
  }

  remove(id: string) {
    return this.databaseService.subCategory.delete({ where: { id } });
  }
}
