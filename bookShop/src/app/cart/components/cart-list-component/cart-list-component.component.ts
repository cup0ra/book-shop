import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-cart-list-component',
  templateUrl: './cart-list-component.component.html',
  styleUrls: ['./cart-list-component.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartListComponentComponent implements OnInit {
  @Input() carts: any;

  @Output() deleteBook = new EventEmitter<number>();

  @Input() sortField: any;

  @Input() isSortField: any;

  ngOnInit(): void {
    console.log(this.carts);
  }

  delBook = (id: number) => {
    this.deleteBook.emit(id);
  };
}
