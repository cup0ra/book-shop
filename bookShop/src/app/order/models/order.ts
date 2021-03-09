import { IBook } from '../../books/models/book';

export interface IOrder {
  name: string;
  street: string;
  home: string;
  flat: string;
  phone: number;
  comment: string;
  payment: string;
  product: IBook[];
}
