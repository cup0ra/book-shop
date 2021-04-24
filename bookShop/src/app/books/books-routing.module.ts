import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookComponentComponent } from './components/book-component/book-component.component';
import { BooksListComponentComponent } from './components/books-list-component/books-list-component.component';
import { BooksComponent } from './books.component';

const booksRoutes: Routes = [
  {
    path: 'books-list',
    component: BooksComponent,
    children: [
      {
        path: '',
        component: BooksListComponentComponent,
      },
      {
        path: `book/:id`,
        component: BookComponentComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(booksRoutes)],
  exports: [RouterModule],
})
export class BooksRoutingModule {
  static components = [BooksComponent, BooksListComponentComponent, BookComponentComponent];
}
