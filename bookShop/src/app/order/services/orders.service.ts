import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientService } from 'src/app/shared/services/http-client/http-client.service';

import { IOrder } from '../models/order';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private httpService: HttpClientService<IOrder>) {}

  getOrders(): Observable<IOrder[]> {
    return this.httpService.get('orders');
  }

  addOrder(obj: IOrder): Observable<IOrder> {
    return this.httpService.post('orders', obj);
  }
}
