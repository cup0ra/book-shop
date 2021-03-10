import { Component, OnInit } from '@angular/core';
import { IOrder } from 'src/app/order/models/order';
import { OrdersService } from 'src/app/order/services/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  orders: IOrder[];

  displayedColumns: string[] = ['id', 'name', 'price', 'quaintly'];

  dataSource: any;

  constructor(private orderServer: OrdersService) {
    this.orders = this.orderServer.getOrders();
  }

  ngOnInit(): void {
    console.log(this.orders);
  }
}
