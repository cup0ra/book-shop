import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/order/services/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  orders: any;

  displayedColumns: string[] = ['id', 'name', 'price', 'quaintly'];

  dataSource: any;

  constructor(private orderService: OrdersService) {}

  ngOnInit(): void {
    this.orderService.getOrders().subscribe((data) => {
      this.orders = data;
    });
  }
}
