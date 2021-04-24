import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AuthGuardService } from './admin/guards/admin.guard';
import { BooksComponent } from './books/books.component';

import { CartComponentComponent } from './cart/cart-component.component';
import { OrderComponent } from './order/order.component';

const routes: Routes = [
  { path: '', redirectTo: 'books-list', pathMatch: 'full' },
  { path: 'cart', component: CartComponentComponent },
  { path: 'order', component: OrderComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuardService] },
  { path: 'books-list', component: BooksComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
