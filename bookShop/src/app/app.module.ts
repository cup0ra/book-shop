import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { AppRoutingModule } from './app-routing.module';
import { CartModule } from './cart/cart-component.module';
import { SharedModule } from './shared/shared.module';
import { BooksModule } from './books/books.module';
import { OrderModule } from './order/order.module';
import { AdminModule } from './admin/admin.module';

import { AuthGuardService } from './admin/guards/admin.guard';
import { AuthService } from './shared/services/auth.services';
import { LoadingInterceptorInterceptor } from './shared/intercepter/loading-interceptor.interceptor';

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BooksModule,
    CartModule,
    AdminModule,
    OrderModule,
    SharedModule,
    AppRoutingModule,
  ],
  providers: [
    AuthGuardService,
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
