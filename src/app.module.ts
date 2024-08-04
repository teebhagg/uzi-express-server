import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ProductsModule } from './products/products.module';
import { BrandsModule } from './brands/brands.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CategoryModule } from './categories/categories.module';
import { SubCategoryModule } from './sub-category/sub-category.module';

@Module({
  imports: [ DatabaseModule, UsersModule, ProductsModule, BrandsModule, AuthModule, CategoryModule, SubCategoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
