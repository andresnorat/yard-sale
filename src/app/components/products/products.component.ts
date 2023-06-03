import { Component, EventEmitter, Input, OnInit, Output,  } from '@angular/core';
import { CreateProductDTO, Product, UpdateProductDTO } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  statusDetailProduct: 'loading' | 'success' | 'error' | 'init' = 'init';
  showDetailProduct = false;
  @Input()products: Product[] = [];
  @Output() onLoadMore = new EventEmitter();
  productChosen!: Product;
  constructor(
    private productsService: ProductsService,
    private storeService: StoreService
  ) {}


  ngOnInit(): void {
  }

  onAddToShoppingCart(product: Product) {
    this.storeService.addProductToCart(product);
  }

  viewDetailProduct() {
    this.showDetailProduct = !this.showDetailProduct;
  }

  onShowDetail(id: string) {
    this.statusDetailProduct = 'loading'
    this.productsService.getProduct(id)
    .subscribe({
      next: (productDetail) => {
        this.productChosen = productDetail;
        this.statusDetailProduct = 'success'
        this.viewDetailProduct();
        },
        error: (error) => {
          console.log(error);
          this.statusDetailProduct = 'error';
        }
      })
  }


  createNewProduct() {
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
        error: () => {

        }
      })
  }


  updateProduct() {
    const changes: UpdateProductDTO = {
      title: 'New  title',
      price: 50000
    }
    const id = this.productChosen.id;
    this.productsService.update(id, changes)
      .subscribe({
        next: (data) => {
          const productIndex = this.products.findIndex(items => items.id === id);
          this.products[productIndex] =  data;
          this.productChosen = data
        },
        error: (error) => {

        }
      }

      )
  }


  deleteProduct(){
    const id = this.productChosen.id;
    this.productsService.delete(id)
    .subscribe({
      next: () =>{
        const productIndex = this.products.findIndex(items => items.id === id);
        this.products.splice(productIndex, 1);
        this.showDetailProduct = false;
      },
      error: () => {

      }
    })
  }

  loadMore(){
   this.onLoadMore.emit();
  }

  // readAndUpdate(id:string){
  //   this.productsService.readAndUpdate(id)
  //   .subscribe(rta => console.log(rta));
  // }
}
