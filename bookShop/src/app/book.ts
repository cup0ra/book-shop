export interface IBookModel {
  name: string;
  img: string;
  description: string;
  price: number;
  category: Category;
  createDate: number;
  isAvailable: boolean;
}

export enum Category {
  Fantasy = 'Fantasy',
  Classics = 'Classics',
  Horror = 'Horror',
}
