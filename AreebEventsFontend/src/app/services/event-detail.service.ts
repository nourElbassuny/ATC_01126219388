import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {Observable} from 'rxjs';
import {Event} from '../models/event';

@Injectable({
  providedIn: 'root'
})
export class EventDetailService {
  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {
  }

  getEventById(id:number):Observable<Event> {
    return this.http.get<Event>(`${this.baseUrl}auth/event/${id}`)
  }

}
