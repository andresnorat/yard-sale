import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/product.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  user!: User;
  counter: number = 0;
  showMenu = false;
  categories: Category[] = [];

  constructor(
    private storeService: StoreService,
    private categoriesService: CategoriesService
  ) { }

  ngOnInit(): void {
    this.storeService.myCart$
      .subscribe(product => {
        this.counter = product.length
      })
    this.storeService.myUser$
      .subscribe(data => this.user = data);
      this.getCategories();
    }

  toogle() {
    this.showMenu = !this.showMenu;
  }

  getCategories() {
    this.categoriesService.getAllCategories()
      .subscribe({
        next: (data) => {
          this.categories = data;
        },
        error: (error) => {
          alert(error);
        }
      })
  }

}

