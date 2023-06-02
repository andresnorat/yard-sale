import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  user!:User;
  counter: number = 0;
  showMenu = false;

  constructor(
    private storeService: StoreService,
    // private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.storeService.myCart$
      .subscribe(product => {
        this.counter = product.length
      })
      this.storeService.myUser$
      .subscribe(data => this.user = data);
  }

  toogle() {
    this.showMenu = !this.showMenu;
  }
}
