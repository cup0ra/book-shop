import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ICart } from '../../models/cart';

@Component({
  selector: 'app-cart-list-component',
  templateUrl: './cart-list-component.component.html',
  styleUrls: ['./cart-list-component.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartListComponentComponent {
  @Input() carts: ICart[];

  @Output() deleteBook = new EventEmitter<string>();

  @Input() sortField: any;

  @Input() isSortField: boolean;

  delBook(id: string): void {
    this.deleteBook.emit(id);
  }
}
