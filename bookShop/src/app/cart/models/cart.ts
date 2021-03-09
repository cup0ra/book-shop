import { IBook } from 'src/app/books/models/book';

export default interface ICart extends IBook {
  quantity: number;
}
