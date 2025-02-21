import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from './product.entity';

@Entity('product_translations')
export class ProductTranslate {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  product_id?: number;

  @Column()
  name?: string;

  @Column()
  unit?: string;

  @Column()
  lang?: string;

  @CreateDateColumn()
  created_at?: Date;

  // Automatically inserts the update timestamp
  @UpdateDateColumn()
  updated_at?: Date;

  @ManyToOne(() => Product, (product) => product.productTranslates)
  @JoinColumn({ name: 'product_id' })
  product?: Product;
}
