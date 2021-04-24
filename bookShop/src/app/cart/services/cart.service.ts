import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IBook } from 'src/app/books/models/book';
import { HttpClientService } from 'src/app/shared/services/http-client.service';

import ICart from '../models/cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: any = [];

  private info = {
    totalQuantity: 0,
    totalSum: 0,
  };

  constructor(private http: HttpClientService<ICart>) {
    this.http.get('cart').subscribe((data) => {
      this.cart = data;
      this.updateCartData();
    });
  }

  getCart(): Observable<ICart[]> {
    return this.http.get('cart');
  }

  getCartInfo() {
    return this.info;
  }

  addBookCart(obj: IBook): Observable<ICart> {
    return this.http.post('cart', { ...obj, quantity: 1 }).pipe(
      tap((data) => {
        const f = this.cart.some((item: ICart) => item.id === data.id);
        this.cart =
          !this.cart.length || !f
            ? [...this.cart, { ...data, quantity: 1 }]
            : this.cart.reduce(
                (arrayCart: ICart[], item: ICart) =>
                  item.id === data.id
                    ? [...arrayCart, { ...item, quantity: item.quantity + 1 }]
                    : [...arrayCart, item],
                [],
              );
        this.updateCartData();
      }),
    );
  }

  changeQuantityBooks(obj: ICart) {
    return this.http.put('cart', obj.id, obj).subscribe((data) => {
      this.cart = this.cart.reduce(
        (arrayCart: ICart[], item: ICart) =>
          item.id === data.id
            ? [...arrayCart, { ...item, quantity: data.quantity }]
            : [...arrayCart, item],
        [],
      );
      this.updateCartData();
    });
  }

  deleteBook(id: string) {
    this.http.delete('cart', id).subscribe(() => {
      this.cart = this.cart.filter((e: ICart) => e.id !== id);
      this.updateCartData();
    });
  }

  removeAllBooks() {
    this.cart.forEach((element: ICart) => {
      this.http.delete('cart', element.id).subscribe((data) => console.log(data));
    });
    this.cart = [];
    this.updateCartData();
  }

  private updateCartData() {
    console.log(this.cart);

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
