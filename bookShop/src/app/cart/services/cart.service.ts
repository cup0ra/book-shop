import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IBook } from 'src/app/books/models/book';
import { HttpClientService } from 'src/app/shared/services/http-client/http-client.service';

import { ICart, ICartInfo } from '../models/cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: ICart[];

  private info: ICartInfo = {
    totalQuantity: 0,
    totalSum: 0,
  };

  constructor(private http: HttpClientService<ICart>) {}

  getCart(): Observable<ICart[]> {
    return this.http.get('cart').pipe(
      tap((data) => {
        this.cart = data;
      }),
    );
  }

  getCartInfo(): ICartInfo {
    return this.info;
  }

  addBookCart(obj: IBook): Observable<ICart> {
    return this.http.post('cart', { ...obj, quantity: 1 }).pipe(
      tap((data) => {
        const f = this.cart.some(({ id }) => id === data.id);
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

  changeQuantityBooks(obj: ICart): Observable<ICart> {
    return this.http.put('cart', obj.id, obj).pipe(
      tap((data) => {
        this.cart = this.cart.reduce(
          (arrayCart: ICart[], item: ICart) =>
            item.id === data.id
              ? [...arrayCart, { ...item, quantity: data.quantity }]
              : [...arrayCart, item],
          [],
        );
        this.updateCartData();
      }),
    );
  }

  deleteBook(id: string): void {
    this.http.delete('cart', id).subscribe(async () => {
      this.cart = this.cart.filter((item) => item.id !== id);
      this.updateCartData();
    });
  }

  removeAllBooks(): void {
    this.cart.forEach((element: ICart) => {
      this.http.delete('cart', element.id).subscribe();
    });
    this.cart = [];
    this.updateCartData();
  }

  private updateCartData(): void {
    this.info.totalQuantity = this.cart.reduce(
      (quantity: number, item: ICart) => quantity + item.quantity,
      0,
    );
    this.info.totalSum = this.cart.reduce(
      (sum: number, { price, quantity }) => sum + price * quantity,
      0,
    );
  }
}
