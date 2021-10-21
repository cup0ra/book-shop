import { Column, Entity } from 'typeorm';
import { Book } from './book.entity';

@Entity({ name: 'cart' })
export class Cart extends Book {
  @Column({ type: 'integer' })
  quantity: number;
}
