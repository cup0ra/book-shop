import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IBook } from '../models/book';
import { booksArray } from '../models/books-mock';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  books: BehaviorSubject<IBook[]>;

  constructor() {
    this.books = new BehaviorSubject(booksArray);
  }

  getBooks = () => this.books;

  getBook = (id: string) => this.books.getValue().find((e: IBook) => e.id === +id);
}
