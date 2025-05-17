import {Component, OnInit} from '@angular/core';
import {EventService} from '../../services/event.service';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {Event} from '../../models/event';

import {Observable} from 'rxjs';
import {EventDetailService} from '../../services/event-detail.service';
import {CurrencyPipe, DatePipe, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {UsersService} from '../../services/users.service';
import {BookingService} from '../../services/booking.service';
import {Booking} from '../../models/booking';
import {User} from '../../models/user';

@Component({
  selector: 'app-event-details',
  imports: [
    NgIf,
    RouterLink,
    DatePipe,
    CurrencyPipe,
    FormsModule
  ],
  templateUrl: './event-details.component.html',
  standalone: true,
  styleUrl: './event-details.component.css'
})
export class EventDetailsComponent implements OnInit {
  eventId!: number;
  event!: Event;
  isBooked: boolean = false;
  showConfirmation: boolean = false;
  isAuthenticated: boolean = false;
  isAdmin: boolean = false;
  isUser: boolean = false;
  ticketCount: number = 1;


  constructor(private route: ActivatedRoute,private router:Router,private eventDetailService: EventDetailService, private userService: UsersService, private bookingService: BookingService) {
  }


  ngOnInit(): void {
    this.eventId = Number(this.route.snapshot.paramMap.get('id'));
    this.getEvent(this.eventId);
    this.isAuthenticated = this.userService.isAuthenticated();
    this.isAdmin = this.userService.isAdmin();
    this.isUser = this.userService.isUser();
    this.route.queryParams.subscribe(params => {
      this.isBooked = params['booked'] === 'true';
    });
    console.log(this.isBooked)
  }

  private getEvent(id: number) {
    this.eventDetailService.getEventById(id).subscribe(
      data => {
        this.event = data;
      }, error => {
        alert(error.message);
      }
    );
  }

  closeConfirmation() {
    this.showConfirmation = false;
  }

  private makeBooking(booking: any) {
    return this.bookingService.makeBooking(booking).subscribe(
      data=>{

      },error => {
        alert(error.message);
      }
    );
  }

  bookEvent() {
    let booking: any = {
      user: {
       id: JSON.parse(localStorage.getItem('ourUser')!).id
      },
      numberOfTickets: this.ticketCount,
      event: {
       id: this.event.id
      },
      totalPrice: this.ticketCount* this.event.price,
    };
    this.makeBooking(booking);
    this.showConfirmation = true;
    this.isBooked = true;
    this.router.navigate(['/auth/eventDetail',this.eventId],{queryParams:{booked:true}});
  }

  cancelBooking() {
    const userId= JSON.parse(localStorage.getItem('ourUser')!).id
    this.bookingService.deleteBookingById(userId,this.eventId).subscribe(
      data=>{
        this.isBooked = false;
        this.router.navigate(['/auth/eventDetail',this.eventId],{queryParams:{booked:false}});
      },error => {
        alert(error.message)
      }
    )
  }
}
