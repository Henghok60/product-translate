import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductTranslate } from './product-translate.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  unit: string;

  @Column()
  photos: string;

  @Column()
  thumbnail_img: string;

  @OneToMany(() => ProductTranslate, (translate) => translate.product)
  productTranslates: ProductTranslate[];
}
