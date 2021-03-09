import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs/internal/observable/of';

@Injectable()
export class AuthService {
  private isloggedIn: boolean;

  constructor(private router: Router) {
    this.isloggedIn = false;
  }

  login() {
    this.isloggedIn = true;
    return of(this.isloggedIn);
  }

  logout(): void {
    this.router.navigate(['/']);
    this.isloggedIn = false;
  }

  getloggedIn(): boolean {
    return this.isloggedIn;
  }
}
