import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private myShoppingCart: Product[] = [];
  private myCart = new BehaviorSubject<Product[]>([])

  private myUserSesssion: User | null = null;
  private myUser = new BehaviorSubject<User>({id: 0, name: '', avatar: '', email: '', password: '',role: ''})

  myCart$ = this.myCart.asObservable();
  myUser$ = this.myUser.asObservable();


  constructor() { }

  addProductToCart(product: Product){
    this.myShoppingCart.push(product);
    this.myCart.next(this.myShoppingCart);
  }


  addUserToMyUsers(user: User){
    this.myUserSesssion = user;
    this.myUser.next(this.myUserSesssion);
  }
}
