import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { LayoutComponent } from './components/layout/layout.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    NavComponent,
    HomeComponent,
    CategoryComponent,
    MycartComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    ProductDetailComponent,
    LayoutComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    WebsiteRoutingModule,
    SharedModule
  ]
})
export class WebsiteModule { }
