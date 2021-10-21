import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';
import { HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { IUser } from 'src/app/auth/model/user';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HttpClientService } from '../http-client/http-client.service';
import { LocalStorageService } from '../local-storage.service';

@Injectable()
export class AuthService {
  public isloggedIn = false;

  public userSource = new BehaviorSubject<IUser | null>(null);

  public user: Observable<IUser | null> = this.userSource.asObservable();

  constructor(
    private router: Router,
    private httpClient: HttpClientService<IUser>,
    private httpClientAuth: HttpClientService<HttpResponse<any>>,
    private cookieService: CookieService,
    private localStorage: LocalStorageService,
  ) {}

  login(user: IUser) {
    return this.httpClient.post('auth/login', user).pipe(
      tap((data) => {
        this.localStorage.set('user', JSON.stringify(data));
        this.userSource.next(data);
        console.log(this.userSource, 'USER');
      }),
    );
  }

  register(user: IUser) {
    return this.httpClient.post('auth/register', user);
  }

  logout(): void {
    this.router.navigate(['/']);
    this.isloggedIn = false;
  }

  getloggedIn(): boolean {
    return this.isloggedIn;
  }

  refreshToken() {
    return this.httpClientAuth.getRefresh('auth/refresh');
  }

  logOut() {
    return this.httpClient.post('log-out');
  }

  getCookies() {
    return this.cookieService.getAll();
  }

  getUser() {
    return this.user;
  }
}
