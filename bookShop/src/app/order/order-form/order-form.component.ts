import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { CartService } from 'src/app/cart/services/cart.service';
import { OrdersService } from '../services/orders.service';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss'],
})
export class OrderFormComponent implements OnInit {
  options: FormGroup;

  order: any = {};

  isCompleted = true;

  constructor(
    fb: FormBuilder,
    private cartService: CartService,
    private location: Location,
    private orderServices: OrdersService,
  ) {
    this.options = fb.group({
      name: new FormControl(''),
      street: new FormControl(''),
      home: new FormControl(''),
      flat: new FormControl(''),
      phone: new FormControl(''),
      comment: new FormControl(''),
      payment: new FormControl(''),
    });
  }

  ngOnInit(): void {
    console.log(this.options.valid);
  }

  onSubmit() {
    this.order = { ...this.order, ...this.options.value, product: this.cartService.cart };
    console.log(this.order);
    this.orderServices.addOrder(this.order);
    console.log(this.orderServices.getOrders());
    this.cartService.removeAllBooks();
    this.isCompleted = false;
  }

  backClicked() {
    console.log('back');
    this.location.back();
  }
}
