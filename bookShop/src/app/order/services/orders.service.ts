import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IOrder } from '../models/order';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  orders: IOrder[] = [];

  ordersSubject: BehaviorSubject<IOrder[]>;

  constructor() {
    this.ordersSubject = new BehaviorSubject(this.orders);
  }
}
