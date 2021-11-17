import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

import { CartService } from 'src/app/cart/services/cart.service';

import { ICart } from '../../models/cart';

@Component({
  selector: 'app-cart-item-component',
  templateUrl: './cart-item-component.component.html',
  styleUrls: ['./cart-item-component.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartItemComponentComponent implements OnInit {
  @Input() cart!: ICart;

  @Output() deleteBook = new EventEmitter<string>();

  price: any;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.price = this.cart.price * this.cart.quantity;
  }

  getInputValue(event: any): void {
    this.price = this.cart.price * event.target.value;
    this.cartService.changeQuantityBooks({ ...this.cart, quantity: +event.target.value });
  }

  removeBook(): void {
    /* this.cartService.deleteBook(this.cart.id); */
    this.deleteBook.emit(this.cart.id);
  }
}
