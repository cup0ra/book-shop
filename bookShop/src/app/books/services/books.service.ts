import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClientService } from 'src/app/shared/services/http-client/http-client.service';

import { IBook } from '../models/book';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private readonly booksSource = new BehaviorSubject<IBook[]>([]);

  public books: Observable<IBook[]> = this.booksSource.asObservable();

  constructor(private booksHttp: HttpClientService<IBook>) {
    this.initBooks();
  }

  initBooks(): void {
    this.booksHttp.get('books').subscribe((books) => {
      this.booksSource.next(books);
    });
  }

  getBooks = (): Observable<IBook[]> => this.booksSource;

  getBook(id: string): Observable<IBook> {
    return this.booksHttp.getId('books', id);
  }

  addBook(obj: IBook): Observable<IBook> {
    return this.booksHttp.post('books', obj).pipe(
      tap((data) => {
        this.booksSource.next([...this.booksSource.getValue(), data]);
      }),
    );
  }

  changeBook(obj: IBook): Observable<IBook> {
    return this.booksHttp.put('books', obj.id, obj).pipe(
      tap((data: any) => {
        this.booksSource.next([
          ...this.booksSource.getValue().filter(({ id }) => id !== data.id),
          data,
        ]);
      }),
    );
  }
}
