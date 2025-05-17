import {Component, OnInit} from '@angular/core';
import {NgIf} from '@angular/common';
import {UsersService} from '../../../services/users.service';
import {RouterLink} from '@angular/router';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-nav',
  imports: [
    NgIf,
    RouterLink,
    FaIconComponent
  ],
  templateUrl: './nav.component.html',
  standalone: true,
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit{
  constructor(private readonly userService: UsersService){}

  isAuthenticated:boolean = false;
  isAdmin:boolean = false;
  isUser:boolean = false;


  ngOnInit(): void {
    this.userService.authStatus$.subscribe((status) => {
      this.isAuthenticated = status;
      this.isAdmin = this.userService.isAdmin();
      this.isUser = this.userService.isUser();
    });
  }

  logout():void{
    this.userService.logOut();
    this.isAuthenticated = false;
    this.isAdmin = false;
    this.isUser = false;
  }
}
