/* eslint-disable no-param-reassign */
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaderResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay, finalize, tap } from 'rxjs/operators';
import { LoadingServiceService } from '../services/loading/loading-service.service';

@Injectable()
export class LoadingInterceptorInterceptor implements HttpInterceptor {
  private totalRequest = 0;

  constructor(private loadingService: LoadingServiceService) {}

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
      finalize((): void => {
        this.totalRequest -= this.totalRequest;
        if (!this.totalRequest) this.loadingService.setLoading(true);
      }),
    );
  }
}
