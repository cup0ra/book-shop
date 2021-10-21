import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpClientService<T> {
  url = 'http://localhost:3000';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:3000',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
    }),
  };

  constructor(private http: HttpClient) {}

  getRefresh(path: string): Observable<T> {
    return this.http.get<T>(`${this.url}/${path}`, this.httpOptions);
  }

  get(path: string): Observable<T[]> {
    return this.http.get<T[]>(`${this.url}/${path}`, this.httpOptions);
  }

  getId = (path: string, id: string): Observable<T> => {
    return this.http.get<T>(`${this.url}/${path}/${id}`, this.httpOptions);
  };

  post(path: string, obj?: T): Observable<T> {
    return this.http.post<T>(`${this.url}/${path}`, obj, this.httpOptions);
  }

  put(path: string, id: string, obj: T): Observable<T> {
    return this.http.put<T>(`${this.url}/${path}/${id}`, obj, this.httpOptions);
  }

  delete(path: string, id: string): Observable<T> {
    return this.http.delete<T>(`${this.url}/${path}/${id}`, this.httpOptions);
  }
}
