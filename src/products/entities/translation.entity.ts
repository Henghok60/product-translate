import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('translations')
export class Translation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  lang: string;

  @Column()
  lang_key: string;

  @Column()
  lang_value: string;

  @CreateDateColumn()
  created_at?: Date;

  // Automatically inserts the update timestamp
  @UpdateDateColumn()
  updated_at?: Date;
}
