import { Component, OnInit } from '@angular/core';
import { IBook } from 'src/app/books/models/book';
import { BooksService } from 'src/app/books/services/books.service';
import { AuthService } from 'src/app/shared/services/auth.services';
import { ActivatedRoute } from '@angular/router';
import { LoadingServiceService } from 'src/app/shared/services/loading-service.service';

@Component({
  selector: 'app-books-list-component',
  templateUrl: './books-list-component.component.html',
  styleUrls: ['./books-list-component.component.scss'],
})
export class BooksListComponentComponent implements OnInit {
  books?: IBook[];

  sortField = 'price';

  isSortField = true;

  isAdmin?: boolean;

  selects = ['price', 'name', 'id'];

  style?: string;

  constructor(
    private booksService: BooksService,
    private authService: AuthService,
    private route: ActivatedRoute,
    public loadingService: LoadingServiceService,
  ) {}

  ngOnInit(): void {
    this.booksService.getBooks().subscribe((data) => {
      this.books = data;
    });
    this.isAdmin = this.authService.getloggedIn();
    this.style = this.isAdmin ? '87%' : '100%';
  }

  sort() {
    this.isSortField = !this.isSortField;
  }

  selectSort(event: Event) {
    this.sortField = (event.target as HTMLSelectElement).value;
  }
}
