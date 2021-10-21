/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaderResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { catchError, delay, finalize, mergeMap, switchMap, tap } from 'rxjs/operators';

import { LoadingServiceService } from '../services/loading/loading-service.service';
import { AuthService } from '../services/auth/auth.services';

@Injectable()
export class LoadingInterceptorInterceptor implements HttpInterceptor {
  private totalRequest = 0;

  private refreshTokenSubject: Subject<any> = new BehaviorSubject<any>(null);

  constructor(private loadingService: LoadingServiceService, private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.totalRequest += this.totalRequest;
    this.loadingService.setLoading(false);
    request = request.clone({
      withCredentials: true,
    });
    return next.handle(request).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpHeaderResponse) {
          console.log(event);
        }
      }),
      delay(1000),
      catchError(
        (error: HttpErrorResponse): Observable<any> => {
          if (error instanceof HttpErrorResponse && error.status === 401) {
            console.log(error.message, 'QQQQQQQQ');
            /* this.authService
              .refreshToken()
              .pipe(
                mergeMap((expare) => {
                  console.log(expare);

                  return next.handle(request);
                }),
              )
              .subscribe(); */
          }
          return throwError(error);
        },
      ),
      finalize((): void => {
        this.totalRequest -= this.totalRequest;
        if (!this.totalRequest) this.loadingService.setLoading(true);
      }),
    );
  }
}
