import ICart from 'src/app/cart/models/cart';

export interface IOrder {
  name: string;
  street: string;
  home: string;
  flat: string;
  phone: number;
  comment: string;
  payment: string;
  product: ICart[];
  id: string;
}
