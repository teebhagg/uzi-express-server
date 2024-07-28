import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UsersService {

  constructor(private readonly databaseService: DatabaseService) {}
  async create(createUserDto: Prisma.UserCreateInput) {
    return await this.databaseService.user.create({ data: createUserDto });
  }

  async findAll() {
    return await this.databaseService.user.findMany();
  }

  async findOne(id: string) {
    return await this.databaseService.user.findUnique({ where: { id } });
  }

  async findByEmail(email: string) {
    return await this.databaseService.user.findUnique({ where: { email } });
  }

  async update(id: string, updateUserDto: Prisma.UserUpdateInput) {
    return await this.databaseService.user.update({
      where: { id },
      data: updateUserDto,
    })
  }

  async remove(id: string) {
    return await this.databaseService.user.delete({ where: { id } });
  }
}
