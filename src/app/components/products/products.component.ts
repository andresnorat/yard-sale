import { Component, OnInit } from '@angular/core';
import { CreateProductDTO, Product } from 'src/app/models/product.model';
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


  createNewProduct(){
    const product: CreateProductDTO = {
      title: 'new product',
      description: 'Andy shoes are designed to keeping in...',
      price: 45444,
      categoryId: 2,
      images: [
        "https://placeimg.com/640/480/any?r=0.9178516507833767",
        "https://placeimg.com/640/480/any?r=0.9300320592588625",
        "https://placeimg.com/640/480/any?r=0.8807778235430017"
        ],
    }
      this.productsService.create(product)
      .subscribe({
        next: (data) => {
          this.products.unshift(data);
        },
        error: () =>{

        }
      })
  }
}
