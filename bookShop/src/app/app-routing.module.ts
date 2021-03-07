import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CartComponentComponent } from './cart/cart-component.component';
import { OrderComponent } from './order/order.component';

const routes: Routes = [
  { path: '', redirectTo: '/order', pathMatch: 'full' },
  { path: 'cart', component: CartComponentComponent },
  { path: 'order', component: OrderComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
