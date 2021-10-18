import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IBook } from './models/book';

import { BooksService } from './services/books.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent implements OnInit {
  public books?: Observable<IBook[]>;

  constructor(private booksService: BooksService) {}

  ngOnInit(): void {
    this.books = this.booksService.getBooks();
  }
}
