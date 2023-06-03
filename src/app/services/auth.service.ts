import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpStatusCode } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Auth } from '../models/auth.model';
import { User } from '../models/user.model';
import { catchError, switchMap, tap, throwError } from 'rxjs';
import { TokenService } from './token.service';
import { checkToken } from '../interceptors/token.interceptor';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.API_URL}/auth`;

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) {}

    login(email: string, password: string){
      return this.http.post<Auth>(`${this.apiUrl}/login`, {email, password}).pipe(
        tap((values)=>{
          this.tokenService.saveToken(values.access_token);
        }),
        catchError((error: HttpErrorResponse) => {
          if(error.status === HttpStatusCode.Unauthorized){
            return throwError('Ups algo salio mal');
          }
          return throwError('Ups algo paso en la peticion');
        })
      )
    }

    profile(){
      return this.http.get<User>(`${this.apiUrl}/profile`,{context: checkToken()}).pipe(
        catchError((error: HttpErrorResponse) =>{
          if(error.status ===  HttpStatusCode.Unauthorized){
            return throwError('Error usuario no esta autorizado')
          }
          return throwError('Ups algo salio mal');
        })
      )
    }


    loginAndProfile(email:string, password: string){
      return this.login(email, password)
      .pipe(
        switchMap((value) => this.profile()),
      )
    }
}
