import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products: Product[] = [];
  limit: number = 16;
  offset: number = 0;

  constructor(
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {
    this.productsService.getAllPorducts(16, 0)
      .subscribe({
        next: (data) => {
          this.products = data;
        },
        error: (error) => {
          alert('Upp ocurrio un error');
        }
      })
  }


  loadMore(){
    this.productsService.getAllPorducts(this.limit, this.offset)
    .subscribe({
      next: (value) => {
        this.products = this.products.concat(value);
        this.offset  += this.limit;
        console.log(this.offset)
      },
      error: (error) => {
        alert('Upp ocurrio un error');
      }
    });
  }
}
