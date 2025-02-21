import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductTranslate } from './entities/product-translate.entity';
import { Translation } from './entities/translation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductTranslate, Translation])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
