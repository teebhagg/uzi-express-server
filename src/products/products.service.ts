import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ProductsService {
  constructor(private readonly databaseService: DatabaseService) {}
  create(createProductDto: Prisma.ProductCreateInput) {
    return this.databaseService.product.create({ data: createProductDto });
  }

  async bulkCreate(createProductsDto: Prisma.ProductCreateManyInput[]) {
    return await this.databaseService.product.createMany({
      data: createProductsDto,
    });
  }

  findAll() {
    return this.databaseService.product.findMany({
      include: {
        brand: true,
        categories: true,
        subCategory: true,
      }
    });
  }

  findOne(id: string) {
    return this.databaseService.product.findUnique({ where: { id } });
  }

  update(id: string, updateProductDto: Prisma.ProductUpdateInput) {
    return this.databaseService.product.update({
      where: { id },
      data: updateProductDto,
    });
  }

  remove(id: string) {
    return this.databaseService.product.delete({ where: { id } });
  }
}
