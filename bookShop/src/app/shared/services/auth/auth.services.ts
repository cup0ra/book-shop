import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/auth/model/user';
import { HttpClientService } from '../http-client/http-client.service';

@Injectable()
export class AuthService {
  public isloggedIn = false;

  constructor(private router: Router, private httpClient: HttpClientService<IUser>) {}

  login(user: IUser) {
    return this.httpClient.post('auth/login', user);
  }

  register(user: IUser): Observable<IUser> {
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
    return this.httpClient.get('auth/refresh').subscribe(() => console.log('REFRESH TOKEN'));
  }
}
