import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../environments/environment';
import {Booking} from '../models/booking';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  getBookingsEventIdByUserId(id:number):Observable<number[]> {
    return this.http.get<number[]>(this.baseUrl+'auth/booked/'+id);
  }
  makeBooking(booking:any): Observable<any> {
    return this.http.post<any>(this.baseUrl+'auth/booking',booking)
  }
  deleteBookingById(userId:number,eventId:number){
    console.log(eventId+" +++"+ userId)
    return this.http.delete(`${this.baseUrl}auth/bookings?userId=${userId}&eventId=${eventId}`)
  }
}
