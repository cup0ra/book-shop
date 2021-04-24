import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClientService } from 'src/app/shared/services/http-client.service';
import { IBook } from '../models/book';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private booksSource = new BehaviorSubject<any>([]);

  public books = this.booksSource.asObservable();

  constructor(private booksHttp: HttpClientService<IBook[] | IBook>) {
    this.booksHttp.get('books').subscribe((books) => {
      this.booksSource.next(books);
    });
  }

  getBooks = () => this.booksSource;

  getBook(id: string): Observable<any> {
    return this.booksHttp.getId('books', id);
  }

  addBook(obj: IBook) {
    return this.booksHttp.post('books', obj).pipe(
      tap((data) => {
        this.booksSource.next([...this.booksSource.getValue(), data]);
      }),
    );
  }

  changeBook(obj: IBook) {
    return this.booksHttp.put('books', obj.id, obj).pipe(
      tap((data: any) => {
        this.booksSource.next([
          ...this.booksSource.getValue().filter((e: IBook) => e.id !== data.id),
          data,
        ]);
      }),
    );
  }
}
