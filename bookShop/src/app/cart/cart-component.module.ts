import { NgModule } from '@angular/core';
import { CartItemComponentComponent } from './components/cart-item-component/cart-item-component.component';
import { CartListComponentComponent } from './components/cart-list-component/cart-list-component.component';
import { SharedModule } from '../shared/shared.module';
import { CartComponentComponent } from './cart-component.component';

@NgModule({
  declarations: [CartComponentComponent, CartListComponentComponent, CartItemComponentComponent],
  imports: [SharedModule],
})
export class CartModule {}
