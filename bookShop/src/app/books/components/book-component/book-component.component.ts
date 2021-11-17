import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { LoadingServiceService } from 'src/app/shared/services/loading/loading-service.service';
import { SnackBarService } from 'src/app/shared/services/snack-bar/snack-bar.service';
import { switchMap } from 'rxjs/operators';
import { BooksService } from '../../services/books.service';
import { CartService } from '../../../cart/services/cart.service';

import { IBook } from '../../models/book';

@Component({
  selector: 'app-book-component',
  templateUrl: './book-component.component.html',
  styleUrls: ['./book-component.component.scss'],
})
export class BookComponentComponent implements OnInit {
  public book: IBook;

  public message = `Book added in cart`;

  constructor(
    public snackBar: SnackBarService,
    private route: ActivatedRoute,
    private cartService: CartService,
    private booksService: BooksService,
    public loadingService: LoadingServiceService,
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params: Params) => {
          return this.booksService.getBook(params.get('id'));
        }),
      )
      .subscribe((data: IBook) => {
        this.book = data;
      });
  }

  addBook(): void {
    this.cartService.addBookCart(this.book).subscribe(() => this.snackBar.open(this.message));
  }
}
