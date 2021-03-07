import { Component, DoCheck } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements DoCheck {
  badge = 0;

  constructor(private cartService: CartService) {}

  ngDoCheck() {
    this.badge = this.cartService.info.totalQuantity;
  }
}
