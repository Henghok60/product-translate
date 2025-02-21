import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { Product } from './products/entities/product.entity';
import { ProductTranslate } from './products/entities/product-translate.entity';
import { Translation } from './products/entities/translation.entity';
import { TranslationModule } from './translation/translation.module';
import { TranslatesModule } from './translates/translates.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      // host: '18.139.161.58',
      // port: 3333,
      // username: 'admin',
      // password: 'MxE80I5Y2u4Cbcm4R',
      // database: 'ecommerce_client',
      // database: 'fnacr',

      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'admin',
      database: 'kshop',
      entities: [Product, ProductTranslate, Translation],
      synchronize: false,
    }),
    ProductsModule,
    TranslationModule,
    TranslatesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
