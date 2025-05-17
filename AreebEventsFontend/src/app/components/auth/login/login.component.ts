import { Component } from '@angular/core';
import {NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {UsersService} from '../../../services/users.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    NgIf,
    FormsModule
  ],
  templateUrl: './login.component.html',
  standalone: true,
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(
    private readonly usersService: UsersService,
    private router: Router
  ) { }
  email: string = ''
  password: string = ''
  errorMessage: string = ''

  async handleSubmit() {

    if (!this.email || !this.password) {
      this.showError("Email and Password is required");
      return
    }

    try {
      const response = await this.usersService.login(this.email, this.password);
      if(response.statusCode == 200){
        localStorage.setItem('token', response.token)
        localStorage.setItem('role', response.role)
        this.router.navigate(['/'])
      }else{
        this.showError(response.message)
      }
    } catch (error: any) {
      this.showError(error.message)
    }

  }

  showError(mess: string) {
    this.errorMessage = mess;
    setTimeout(() => {
      this.errorMessage = ''
    }, 3000)
  }
}
