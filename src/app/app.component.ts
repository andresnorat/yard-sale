import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';
import { CreateUserDTO } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private authService: AuthService,
    private usersService: UsersService
  ) { }

  createUser() {
    const dtoUser: CreateUserDTO = {
      name: 'Andres',
      email: 'pepito@gmail.com',
      password: '12345',
      avatar: 'no hay imagen'
    }
    this.usersService.create(dtoUser)
      .subscribe({
        next: (userCreated) => {
          console.log(userCreated);
        },
        error: (error) => {
        }
      });
  }

  login(){
    this.authService.login('pepito@gmail.com', '12345',
    ).subscribe({

    });
  }

}
