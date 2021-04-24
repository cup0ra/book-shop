import { Component, OnInit } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

import { ActivatedRoute } from '@angular/router';
import { LoadingServiceService } from 'src/app/shared/services/loading-service.service';
import { BooksService } from '../../services/books.service';
import { CartService } from '../../../cart/services/cart.service';
import { IBook } from '../../models/book';

@Component({
  selector: 'app-book-component',
  templateUrl: './book-component.component.html',
  styleUrls: ['./book-component.component.scss'],
})
export class BookComponentComponent implements OnInit {
  book: any;

  message = `Book added in cart`;

  actionButtonLabel = 'Retry';

  action = false;

  autoHide = 2000;

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';

  verticalPosition: MatSnackBarVerticalPosition = 'top';

  addExtraClass = false;

  constructor(
    public snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private cartService: CartService,
    private booksService: BooksService,
    public loadingService: LoadingServiceService,
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.booksService.getBook(id).subscribe((data: IBook) => {
        this.book = data;
      });
    }
  }

  addBook(): void {
    if (this.book) this.cartService.addBookCart(this.book).subscribe(() => this.open());
  }

  open() {
    const config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = this.autoHide;
    this.snackBar.open(this.message, this.action ? this.actionButtonLabel : undefined, config);
  }
}
