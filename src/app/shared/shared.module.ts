import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImgComponent } from './components/img/img.component';
import { ProductComponent } from './components/product/product.component';
import { ProductsComponent } from './components/products/products.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ThousandsSeparatorPipe } from './pipes/thousands-separator.pipe';

@NgModule({
  declarations: [
    ProductComponent,
    ImgComponent,
    ProductsComponent,
    ThousandsSeparatorPipe
  ],
  imports: [
    CommonModule, 
    HttpClientModule,
    RouterModule
  ], 
  exports: [
    ProductComponent,
    ImgComponent,
    ProductsComponent
  ]
})
export class SharedModule { }
