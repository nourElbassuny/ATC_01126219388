import { Injectable } from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Category} from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private BASE_URL: string=environment.baseUrl;

  constructor(private  http: HttpClient) { }

  getAllCategories ():Observable<Category[]> {
    return this.http.get<Category[]>(this.BASE_URL+'auth/category');
  }
}
