import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  showDetailProduct = false;
  products: Product[] = [];

  constructor(
    private productsService: ProductsService,
    private storeService: StoreService
  ) { }

  ngOnInit(): void {
    this.productsService.getAllPorducts()
      .subscribe({
        next: (value) => {
          this.products = value
        },
        error: (error) => {
          alert('Upp ocurrio un error');
        }
      });
  }

  onAddToShoppingCart(product: Product) {
    this.storeService.addProductToCart(product);
  }

  viewDetailProduct() {
    this.showDetailProduct = !this.showDetailProduct;
  }

  onShowDetail(id: string) {
    this.viewDetailProduct();
    this.productsService.getProduct(id)
      .subscribe({
        next: (product) => {
          console.log(product)
        },
        error: (error) => {
          alert('Upp ocurrio un error');
        }
      })
  }

}
