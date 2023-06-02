import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpStatusCode } from '@angular/common/http';
import { CreateProductDTO, Product,UpdateProductDTO } from '../models/product.model';
import { retry, retryWhen, catchError, map, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { throwError} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = `${environment.API_URL}/products`

  constructor(
    private http: HttpClient
  ) {}


  getAllPorducts(limit?: number, offset?: number){
    let params = new HttpParams();
    if (limit !== undefined && offset !== undefined) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this.http.get<Product[]>(this.apiUrl, { params })
    .pipe(
      retry(3),
      // map(products => products.map(item => {
      //   return {
      //     ...item,
      //     taxes: .19 * item.price
      //   }
      // }))
      );
  }

  getProduct(id: string){
    return this.http.get<Product>(`${this.apiUrl}/${id}`)
    .pipe(
      catchError((error: HttpErrorResponse) =>{
        if(error.status === HttpStatusCode.InternalServerError){
          return throwError('Ups algo esta fallando en el server');
        }
        if(error.status === HttpStatusCode.NotFound){
          return throwError('El producto no existe');
        }
        if(error.status === HttpStatusCode.Unauthorized){
          return throwError('Ups no tienes autorización para acceder a esta opcion');
        }
        return throwError('Ups algo salio mal');
      })
    );
  }


  getProductByPage(limit: number, offset: number){
        return this.http.get<Product[]>(`${this.apiUrl}`,{
          params: {limit, offset}
        });
  }


  create(dto: CreateProductDTO ){
    return this.http.post<Product>(this.apiUrl,dto)
  }

  update(id: string, dto: UpdateProductDTO){
    return this.http.put<Product>(`${this.apiUrl}/${id}`, dto);
  }

  delete(id: string){
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if(error.status === HttpStatusCode.Unauthorized){
          return throwError('Unauthorized')
        }
        return throwError('Upps erre')
      })
    )
  }

//
  readAndUpdate(id: string){
    return this.getProduct(id)
    .pipe(
      switchMap((product) => this.update(product.id, {title: 'name update'})),
      switchMap((productUpdate) => this.delete(productUpdate.id))
    )
  }
}
