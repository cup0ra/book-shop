import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay, finalize } from 'rxjs/operators';
import { LoadingServiceService } from '../services/loading-service.service';

@Injectable()
export class LoadingInterceptorInterceptor implements HttpInterceptor {
  private totalRequest = 0;

  constructor(private loadingService: LoadingServiceService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.totalRequest += this.totalRequest;
    this.loadingService.setLoading(false);
    return next.handle(request).pipe(
      delay(1000),
      finalize((): void => {
        this.totalRequest -= this.totalRequest;
        if (!this.totalRequest) this.loadingService.setLoading(true);
      }),
    );
  }
}
