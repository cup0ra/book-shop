/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { BooksService } from 'src/app/books/services/books.service';
import { IBook } from 'src/app/books/models/book';

@Injectable({ providedIn: 'root' })
export class EditProductResolver implements Resolve<IBook> {
  constructor(private service: BooksService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const id: any = route.paramMap.get('id');
    return this.service.getBook(id);
  }
}
