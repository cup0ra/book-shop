import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksListComponentComponent } from '../books/components/books-list-component/books-list-component.component';
import { AdminComponent } from './admin.component';
import { AddBooksComponent } from './components/add-books/add-books.component';
import { OrdersComponent } from './components/orders/orders.component';
import { AuthGuardService } from './guards/admin.guard';
import { EditProductResolver } from './guards/resolve-edit.guard';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: '',
        redirectTo: 'products',
        pathMatch: 'full',
      },
      {
        path: 'products',
        component: BooksListComponentComponent,
      },
      {
        path: 'orders',
        component: OrdersComponent,
      },
      {
        path: 'product',
        children: [
          {
            path: 'add',
            component: AddBooksComponent,
          },
          {
            path: 'edit/:id',
            component: AddBooksComponent,
            resolve: { book: EditProductResolver },
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {
  static components = [AdminComponent, AddBooksComponent];
}
