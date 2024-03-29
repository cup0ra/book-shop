import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { CartService } from 'src/app/cart/services/cart.service';
import { GeneratorService } from 'src/app/core/service/generator';
import { OrdersService } from '../services/orders.service';
import { ICart } from '../../cart/models/cart';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss'],
})
export class OrderFormComponent implements OnInit {
  options!: FormGroup;

  order: any = {};

  cartItems: ICart[];

  isCompleted = true;

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private location: Location,
    private orderServices: OrdersService,
    private generator: GeneratorService,
  ) {}

  ngOnInit(): void {
    this.options = this.fb.group({
      name: new FormControl(''),
      street: new FormControl(''),
      home: new FormControl(''),
      flat: new FormControl(''),
      phone: new FormControl(''),
      comment: new FormControl(''),
      payment: new FormControl(''),
    });
    this.cartService.getCart().subscribe((cart) => {
      this.cartItems = cart;
    });
  }

  onSubmit(): void {
    this.orderServices
      .addOrder({
        ...this.order,
        ...this.options.value,
        product: this.cartItems,
        id: this.generator.getRandomId(),
      })
      .subscribe(() => {
        this.cartService.removeAllBooks();
        this.isCompleted = false;
      });
  }

  backClicked(): void {
    this.location.back();
  }
}
