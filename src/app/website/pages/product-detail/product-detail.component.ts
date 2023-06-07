import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,  } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  productId: string | null = null;
  product: Product | null = null;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private location: Location,
    private storeService: StoreService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        this.productId = params.get('id')
        if(this.productId){
          return this.productsService.getProduct(this.productId)
        }
        return []
      })
    ).subscribe({
      next: (value) => {
        this.product  = value;
      },
      error: () => {

      }
    })
  }

  addTocart(){
    if(this.product){
      this.storeService.addProductToCart(this.product);
    }
  }


  goToBack(){
    this.location.back()
  }
}
