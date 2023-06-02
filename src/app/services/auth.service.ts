import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpStatusCode } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Auth } from '../models/auth.model';
import { User } from '../models/user.model';
import { BehaviorSubject, catchError, switchMap, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.API_URL}/auth`

  private UserSesion!:User;

  constructor(
    private http: HttpClient
  ) {}

    login(email: string, password: string){
      return this.http.post<Auth>(`${this.apiUrl}/login`, {email, password})
    }

    profile(token: string){
      return this.http.get<User>(`${this.apiUrl}/profile`,{
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }).pipe(
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
        switchMap((value) => this.profile(value.access_token)),
      )
    }
}
