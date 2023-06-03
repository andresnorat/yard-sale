import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  categoryId: string | null = null;
  limit: number = 16;
  offset: number = 0;
  products: Product[] = [];
  statusCategory: 'init' | 'loading' | 'succes' | 'error' = 'init';

  constructor(
    private route: ActivatedRoute,
    private productsServices: ProductsService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap((params) => {
        this.statusCategory= 'loading'
        this.categoryId = params.get('id');
        if (this.categoryId) {
          return this.productsServices.getByCategory(this.categoryId, this.limit, this.offset)
        }
        return []
      })).subscribe({
        next: (data) => {
          this.statusCategory = 'succes';
          this.products = data;
        },
        error: (error) => {
          this.statusCategory = 'error'
          console.log(error);
        }
      })
  }
}
