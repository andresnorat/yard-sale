import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';
import { CreateUserDTO, User } from './models/user.model';
import { StoreService } from './services/store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  user: User | null = null;

  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private storeService: StoreService
  ) { }

  createUser() {
    const dtoUser: CreateUserDTO = {
      name: 'Andres',
      email: 'pepito@gmail.com',
      password: '12345',
      avatar: 'https://api.lorem.space/image/face?w=640&h=480&r=867'
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

  login() {
    this.authService.loginAndProfile('pepito@gmail.com', '12345',
    ).subscribe({
      next: (values) => {
        this.storeService.addUserToMyUsers(values);
      }
    });
  }


  // getProfile() {
  //   this.authService.profile(this.token)
  //     .subscribe({
  //       next: (profile) => {
  //         console.log(profile);
  //       },
  //       error: (error) => {
  //         console.log(error);
  //       }
  //     })
  // }
}
