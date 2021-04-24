import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, EMPTY } from 'rxjs';
import { retry, tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export abstract class HttpClientService<T> {
  url = 'http://localhost:3000';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  get(path: string): Observable<T[]> {
    return this.http.get<T[]>(`${this.url}/${path}`).pipe(
      retry(3),
      tap((data) => console.log('fetched', data)),
      catchError((error) => {
        console.log('[ERROR]', error);
        return EMPTY;
      }),
    );
  }

  getId = (path: string, id: string): Observable<T[]> => {
    return this.http.get<T[]>(`${this.url}/${path}/${id}`).pipe(
      catchError((error) => {
        console.log('[ERROR]', error);
        return EMPTY;
      }),
    );
  };

  post(path: string, obj: T): Observable<T> {
    return this.http.post<T>(`${this.url}/${path}`, obj, this.httpOptions).pipe(
      tap(() => console.log('add')),
      catchError((error) => {
        console.log('[ERROR]', error);
        return EMPTY;
      }),
    );
  }

  put(path: string, id: string, obj: T): Observable<T> {
    return this.http.put<T>(`${this.url}/${path}/${id}`, obj, this.httpOptions).pipe(
      tap(() => console.log('change')),
      catchError((error) => {
        console.log('[ERROR]', error);
        return EMPTY;
      }),
    );
  }

  delete(path: string, id: string): Observable<T> {
    return this.http.delete<T>(`${this.url}/${path}/${id}`, this.httpOptions).pipe(
      tap(() => console.log('delete')),
      catchError((error) => {
        console.log('[ERROR]', error);
        return EMPTY;
      }),
    );
  }
}
