import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IBook } from 'src/app/models/book';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-books-list-component',
  templateUrl: './books-list-component.component.html',
  styleUrls: ['./books-list-component.component.scss'],
})
export class BooksListComponentComponent implements OnInit {
  books?: Observable<IBook[]>;

  sortField = 'price';

  isSortField = true;

  selects = ['price', 'name', 'id'];

  constructor(private booksService: BooksService) {}

  ngOnInit(): void {
    this.books = this.booksService.getBooks();
  }

  sort() {
    this.isSortField = !this.isSortField;
  }

  selectSort(event: Event) {
    this.sortField = (event.target as HTMLSelectElement).value;
  }
}
