import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IOrder } from '../models/order';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private orders: IOrder[] = [];

  ordersSubject: BehaviorSubject<IOrder[]>;

  constructor() {
    this.ordersSubject = new BehaviorSubject(this.orders);
  }

  getOrders = () => this.ordersSubject.getValue();

  addOrder = (obj: IOrder): void => {
    this.ordersSubject.next([...this.ordersSubject.getValue(), obj]);
  };
}
