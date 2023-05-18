import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  counter: number = 0;
  showMenu = false;

  constructor(
    private storeService: StoreService,
  ) { }

  ngOnInit(): void {
    this.storeService.myCart$
      .subscribe(product => {
        this.counter = product.length
      })
  }

  toogle() {
    this.showMenu = !this.showMenu;
  }

}
