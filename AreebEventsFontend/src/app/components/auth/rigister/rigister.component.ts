import { Component } from '@angular/core';
import {NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {UsersService} from '../../../services/users.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-rigister',
  imports: [
    NgIf,
    FormsModule
  ],
  templateUrl: './rigister.component.html',
  standalone: true,
  styleUrl: './rigister.component.css'
})
export class RigisterComponent {
  formData: any = {
    firstname:'',
    lastname: '',
    email: '',
    password: '',
  };
  errorMessage: string = '';

  constructor(
    private readonly userService: UsersService,
    private readonly router: Router
  ) { }

  async handleSubmit() {

    // Check if all fields are not empty
    if (!this.formData.lastname||!this.formData.firstname || !this.formData.email || !this.formData.password) {
      this.showError('Please fill in all fields.');
      return;
    }

    // Confirm registration with user
    const confirmRegistration = confirm('Are you sure you want to register this user?');
    if (!confirmRegistration) {
      return;
    }

    try {
      const response = await this.userService.register(this.formData);
      if (response.statusCode === 200) {
        this.router.navigate(['']);
      } else {
        this.showError(response.message);
      }
    } catch (error: any) {
      this.showError(error.message);
    }
  }

  showError(message: string) {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = ''; // Clear the error message after the specified duration
    }, 3000);
  }
}
