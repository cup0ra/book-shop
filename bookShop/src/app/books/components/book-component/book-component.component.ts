import { Component, OnInit } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

import { ActivatedRoute } from '@angular/router';
import { BooksService } from '../../services/books.service';
import { CartService } from '../../../cart/services/cart.service';

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
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.book = this.booksService.getBook(id);
  }

  addBook(): void {
    if (this.book) this.cartService.addBookCart(this.book);
    this.open();
  }

  open() {
    const config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = this.autoHide;
    this.snackBar.open(this.message, this.action ? this.actionButtonLabel : undefined, config);
  }
}
