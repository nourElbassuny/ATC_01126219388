import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {Observable} from 'rxjs';
import {Event} from '../models/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {
  }

  addEvent(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}auth/event/add`, formData)
  }

  getAllEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.baseUrl + 'auth/allEvent');
  }

  deleteEventById(id: number): Observable<Event> {
    return this.http.delete<Event>(`${this.baseUrl}auth/event/delete/${id}`);
  }

  getEventsByCategoryId(id: number): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.baseUrl}auth/event/byCategory/${id}`);
  }

  getEventById(id: number): Observable<Event> {
    return this.http.get<Event>(`${this.baseUrl}auth/event/${id}`);
  }

  updateEvent(formData: FormData) {
    return this.http.put<Event>(`${this.baseUrl}auth/event/update`, formData,
      { headers: { 'Accept': 'application/json' } }
    );
  }

  getEvents(page: number = 0): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}auth/event?page=${page}`);
  }
}
