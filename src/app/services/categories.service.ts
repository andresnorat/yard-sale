import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/product.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private apiUrl = `${environment.API_URL}/categories`;


  constructor(
    private http: HttpClient
  ) {}

  getAllCategories(){
    return this.http.get<Category[]>(this.apiUrl);
  }
}
