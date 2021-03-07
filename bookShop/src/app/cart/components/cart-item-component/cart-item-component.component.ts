import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { BooksService } from 'src/app/services/books.service';
import { CartService } from 'src/app/services/cart.service';
import { ICart } from '../../../models/book';

@Component({
  selector: 'app-cart-item-component',
  templateUrl: './cart-item-component.component.html',
  styleUrls: ['./cart-item-component.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartItemComponentComponent implements OnInit, OnChanges {
  @Input() cart!: ICart;

  @Output() deleteBook = new EventEmitter<number>();

  price: any;

  constructor(private cartService: CartService, private booksService: BooksService) {}

  ngOnInit(): void {
    this.price = this.cart.price * this.cart.quantity;
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(`OnChanges`, changes.cart);
  }

  getInputValue(event: any) {
    this.price = this.cart.price * event.target.value;
    this.cartService.changeQuantityBooks(this.cart.id, event.target.value);
  }

  removeBook() {
    /* this.cartService.deleteBook(this.cart.id); */
    this.deleteBook.emit(this.cart.id);
  }
}