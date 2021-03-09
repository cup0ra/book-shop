import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IBook } from '../models/book';
import { booksArray } from '../../shared/models/books-mock';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  books: BehaviorSubject<IBook[]>;

  constructor() {
    this.books = new BehaviorSubject(booksArray);
  }

  getBooks = () => this.books;

  getBook = (id: string): any => {
    return this.books.getValue().find((e: IBook) => e.id === +id);
  };

  addBook(obj: IBook) {
    this.books.next([...this.books.getValue(), obj]);
    console.log(this.books.getValue());
  }

  changeBook(obj: IBook) {
    this.books.next([...this.books.getValue().filter((e: IBook) => e.id !== obj.id), obj]);
  }
}
