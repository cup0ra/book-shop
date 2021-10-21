import { PrimaryGeneratedColumn, Column, BaseEntity, Entity } from 'typeorm';

@Entity({ name: 'book' })
export class Book extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 300 })
  name: string;

  @Column({ type: 'varchar', length: 300 })
  img: boolean;

  @Column()
  price: number;

  @Column({ type: 'varchar', length: 1000 })
  description: string;

  @Column({ type: 'varchar', length: 300 })
  category: string;

  @Column({ type: 'boolean', default: false })
  isAvailable: boolean;

  @Column({ type: 'bigint' })
  createDate: number;
}
