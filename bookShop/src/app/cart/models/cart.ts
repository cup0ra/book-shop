import { IBook } from 'src/app/books/models/book';

export interface ICart extends IBook {
  quantity: number;
}

export interface ICartInfo {
  totalQuantity: number;
  totalSum: number;
}
