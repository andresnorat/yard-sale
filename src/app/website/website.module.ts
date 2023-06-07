import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './components/products/products.component';
import { ImgComponent } from './components/img/img.component';
import { ProductComponent } from './components/product/product.component';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { MycartComponent } from './pages/mycart/mycart.component';
import { CategoryComponent } from './pages/category/category.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { WebsiteRoutingModule } from './website-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ThousandsSeparatorPipe } from './pipes/thousands-separator.pipe';
import { LayoutComponent } from './components/layout/layout.component';



@NgModule({
  declarations: [
    ProductComponent,
    ImgComponent,
    ProductsComponent,
    NavComponent,
    HomeComponent,
    CategoryComponent,
    MycartComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    ProductDetailComponent,
    ThousandsSeparatorPipe,
    LayoutComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    WebsiteRoutingModule,
  ]
})
export class WebsiteModule { }
