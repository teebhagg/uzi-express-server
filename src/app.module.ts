import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ProductsModule } from './products/products.module';
import { BrandsModule } from './brands/brands.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [ DatabaseModule, UsersModule, ProductsModule, BrandsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
