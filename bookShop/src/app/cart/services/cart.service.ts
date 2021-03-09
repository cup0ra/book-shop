import { Injectable } from '@angular/core';

import { IBook } from '../../books/models/book';
import ICart from '../models/cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  [x: string]: any;

  cart: any = [];

  info = {
    totalQuantity: 0,
    totalSum: 0,
  };

  getCart() {
    return this.cart;
  }

  addBookCart(value: IBook): void {
    const f = this.cart.some((e: ICart) => e.id === value.id);
    this.cart =
      !this.cart.length || !f
        ? [...this.cart, { ...value, quantity: 1 }]
        : this.cart.reduce(
            (a: ICart[], b: ICart) =>
              b.id === value.id ? [...a, { ...b, quantity: b.quantity + 1 }] : [...a, b],
            [],
          );
    this.updateCartData();
  }

  changeQuantityBooks(id: number, value: string) {
    this.cart = this.cart.reduce(
      (a: ICart[], b: ICart) => (b.id === id ? [...a, { ...b, quantity: +value }] : [...a, b]),
      [],
    );
    this.updateCartData();
  }

  deleteBook(id: number) {
    this.cart = this.cart.filter((e: ICart) => e.id !== id);
    this.updateCartData();
  }

  removeAllBooks() {
    this.cart = [];
    this.updateCartData();
  }

  private updateCartData() {
    this.info.totalQuantity = this.cart.reduce(
      (quantity: number, item: ICart) => quantity + item.quantity,
      0,
    );
    this.info.totalSum = this.cart.reduce(
      (sum: number, item: ICart) => sum + item.price * item.quantity,
      0,
    );
  }
}
