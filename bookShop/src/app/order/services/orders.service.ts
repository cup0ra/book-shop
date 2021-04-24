import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClientService } from 'src/app/shared/services/http-client.service';
import { IOrder } from '../models/order';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private orders: IOrder[] = [];

  constructor(private httpService: HttpClientService<IOrder>) {}

  getOrders() {
    return this.httpService.get('orders').pipe(
      tap((data) => {
        this.orders = data;
      }),
    );
  }

  addOrder = (obj: IOrder): Observable<IOrder> => {
    return this.httpService.post('orders', obj).pipe(
      tap((data) => {
        this.orders = [...this.orders, data];
      }),
    );
  };
}
