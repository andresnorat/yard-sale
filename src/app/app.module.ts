import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './components/product/product.component';
import { ImgComponent } from './components/img/img.component';
import { ProductsComponent } from './components/products/products.component';
import { NavComponent } from './components/nav/nav.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ThousandsSeparatorPipe } from './pipes/thousands-separator.pipe';
import {MatPaginatorModule} from '@angular/material/paginator';
import { TimeInterceptor } from './interceptors/time.interceptor';
import { TokenInterceptor } from './interceptors/token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    ImgComponent,
    ProductsComponent,
    NavComponent,
    ThousandsSeparatorPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatPaginatorModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TimeInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
