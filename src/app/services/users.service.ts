import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CreateUserDTO, User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpClient
  ) {}

  private apiUrl = `${environment.API_URL}/users`

  getAll(){
    return this.http.get<User[]>(this.apiUrl);
  }


  create(dto: CreateUserDTO){
    return this.http.post<User>(`${this.apiUrl}`, dto)
  }

}
