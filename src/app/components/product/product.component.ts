import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {



  @Input() product: Product = {
    id: '',
    title: '',
    images: [''],
    price: 0,
    description: '',
  }

  @Output() addProduct = new EventEmitter<Product>();
  @Output() showProduct = new EventEmitter<string>();


  constructor() { }

  ngOnInit(): void {
  }

  addedProduct() {
    this.addProduct.emit(this.product);
  }

  onDetailProduct(){
    this.showProduct.emit(this.product.id);
  }
}
