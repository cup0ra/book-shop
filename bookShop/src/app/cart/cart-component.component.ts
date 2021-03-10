import { Component, OnInit } from '@angular/core';

import { BooksService } from '../books/services/books.service';
import { CartService } from './services/cart.service';

import ICart from './models/cart';

@Component({
  selector: 'app-cart-component',
  templateUrl: './cart-component.component.html',
  styleUrls: ['./cart-component.component.scss'],
})
export class CartComponentComponent implements OnInit {
  carts: ICart[] = [];

  info: any = this.cartService.info;

  isCart = false;

  sortField = 'price';

  isSortField = true;

  selects = ['price', 'name', 'quantity'];

  constructor(private cartService: CartService, private booksService: BooksService) {}

  ngOnInit(): void {
    this.updateCart();
  }

  ngOnDestroy() {
    console.log('destroy');
  }

  deleteBook = (id: number): void => {
    this.cartService.deleteBook(id);
    this.updateCart();
  };

  deleteAllBooks = () => {
    this.cartService.removeAllBooks();
    this.updateCart();
  };

  updateCart() {
    this.carts = this.cartService.getCart();
    this.isCart = this.carts.length > 0;
  }

  sort() {
    this.isSortField = !this.isSortField;
  }

  selectSort(event: Event) {
    this.sortField = (event.target as HTMLSelectElement).value;
  }
}
