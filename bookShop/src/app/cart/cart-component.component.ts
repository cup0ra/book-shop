import { Component, OnInit } from '@angular/core';

import { CartService } from './services/cart.service';

import { ICart } from './models/cart';

@Component({
  selector: 'app-cart-component',
  templateUrl: './cart-component.component.html',
  styleUrls: ['./cart-component.component.scss'],
})
export class CartComponentComponent implements OnInit {
  carts: ICart[] = [];

  info: any;

  isCart = false;

  sortField = 'price';

  isSortField = true;

  selects = ['price', 'name', 'quantity'];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.info = this.cartService.getCartInfo();
    this.updateCart();
  }

  deleteBook(id: string): void {
    this.cartService.deleteBook(id);
    this.updateCart();
  }

  deleteAllBooks(): void {
    this.cartService.removeAllBooks();
    this.updateCart();
  }

  updateCart(): void {
    this.cartService.getCart().subscribe((data) => {
      this.carts = data;
      this.isCart = this.carts.length > 0;
    });
  }

  sort(): void {
    this.isSortField = !this.isSortField;
  }

  selectSort(event: Event): void {
    this.sortField = (event.target as HTMLSelectElement).value;
  }
}
