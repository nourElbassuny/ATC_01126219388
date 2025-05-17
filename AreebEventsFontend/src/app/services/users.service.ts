import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {User} from '../models/user';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private BASE_URL: string = environment.baseUrl;
  private authStatus = new BehaviorSubject<boolean>(this.hasToken());
  authStatus$ = this.authStatus.asObservable();
  constructor(private http: HttpClient) {
  }
  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  async login(email: string, password: string): Promise<any> {
    const url = `${this.BASE_URL}auth/login`;
    try {
      const response = await this.http.post<any>(url, { email, password }).toPromise();
      localStorage.setItem('ourUser', JSON.stringify(response.ourUsers));
      localStorage.setItem('token', response.token);
      localStorage.setItem('role', response.ourUsers.role);
      this.authStatus.next(true);
      return response;
    } catch (err) {
      throw err;
    }

  }

  async register(userData: any): Promise<any> {
    const url = `${this.BASE_URL}auth/register`;
    try {
      return this.http.post<any>(url, userData).toPromise();
    } catch (error) {
      throw error;
    }
  }

  logOut(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.clear();
    }
  }

  isAuthenticated(): boolean {
    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('token');
      return !!token;
    }
    return false;

  }

  isAdmin(): boolean {
    if (typeof localStorage !== 'undefined') {
      const role = localStorage.getItem('role');
      return role === 'admin'
    }
    return false;

  }

  isUser(): boolean {
    if (typeof localStorage !== 'undefined') {
      const role = localStorage.getItem('role');
      return role === 'user'
    }
    return false;

  }
}
