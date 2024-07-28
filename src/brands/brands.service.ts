import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class BrandsService {

  constructor(private readonly databaseService: DatabaseService) {}
  create(createBrandDto: Prisma.BrandCreateInput) {
    return this.databaseService.brand.create({ data: createBrandDto });
  }

  findAll() {
    return this.databaseService.brand.findMany();
  }

  findOne(id: string) {
    return this.databaseService.brand.findUnique({ where: { id } });
  }

  update(id: string, updateBrandDto: Prisma.BrandUpdateInput) {
    return this.databaseService.brand.update({
      where: { id },
      data: updateBrandDto,
    });
  }

  remove(id: string) {
    return this.databaseService.brand.delete({ where: { id } });
  }
}
