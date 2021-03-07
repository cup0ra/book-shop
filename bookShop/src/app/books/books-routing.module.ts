import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookComponentComponent } from './book-component/book-component.component';
import { BooksListComponentComponent } from './books-list-component/books-list-component.component';
import { BooksComponent } from './books.component';

const booksRoutes: Routes = [
  {
    path: '',
    redirectTo: '/booksList',
    pathMatch: 'full',
  },
  {
    path: 'booksList',
    component: BooksListComponentComponent,
  },
  {
    path: `book/:id`,
    component: BookComponentComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(booksRoutes)],
  exports: [RouterModule],
})
export class BooksRoutingModule {
  static components = [BooksComponent, BooksListComponentComponent, BookComponentComponent];
}
