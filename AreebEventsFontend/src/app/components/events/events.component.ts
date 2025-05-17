import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CurrencyPipe, DatePipe, NgForOf, NgIf, SlicePipe} from '@angular/common';
import {CategoryService} from '../../services/category.service';
import {Router, RouterLink} from '@angular/router';
import {Category} from '../../models/category';
import {Event} from '../../models/event';
import {EventService} from '../../services/event.service';
import {UsersService} from '../../services/users.service';
import {User} from '../../models/user';
import {BookingService} from '../../services/booking.service';

@Component({
  selector: 'app-events',
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    DatePipe,
    SlicePipe,
    RouterLink,
    CurrencyPipe
  ],
  templateUrl: './events.component.html',
  standalone: true,
  styleUrl: './events.component.css'
})
export class EventsComponent implements OnInit {
  selectedCategory: string = 'All';
  AllEventsByCategory: Category[] = [];
  loadingEvents: boolean = true;
  eventsList: any = [];

  isAuthenticated: boolean = false;
  isAdmin: boolean = false;
  isUser: boolean = false;
  oursUser!: User;
  eventIdBookedSet: Set<number> = new Set<number>();
  searchTerm: any;
  currentPage: number = 0;
  totalPages: number = 0;
  filterEventsList: any[] = [];
  loading = false;
  constructor(private bookingService: BookingService, private categoryService: CategoryService, private eventService: EventService, private userService: UsersService) {
  }

  ngOnInit() {
    this.loadingEvents = true;
    this.getAllCategories();
    this.getEvents();
    this.isAuthenticated = this.userService.isAuthenticated();
    this.isAdmin = this.userService.isAdmin();
    this.isUser = this.userService.isUser();
    this.getUser();
    this.getBookingEvents();
    this.loadingEvents = false;
  }


  getEvents(page: number = 0) {
    this.loading = true;
    this.eventService.getEvents(page).subscribe(response => {

      this.filterEventsList = response.content;
      this.currentPage = response.currentPage;
      this.totalPages = response.totalPage;
      this.loading = false;
    });
  }

  goToPage(page: number) {
    if (page >= 0 && page < this.totalPages) {
      this.getEvents(page);
    }
  }

  private getEventsByCategoryId(categoryId: number): void {
    this.eventService.getEventsByCategoryId(categoryId).subscribe(
      data => {
        this.eventsList = data;
        this.filterEventsList=[...this.eventsList]
      }, error => {
        alert(error.message);
      }
    )
  }

  getUser() {
    if (this.isAuthenticated) {
      this.oursUser = JSON.parse(localStorage.getItem('ourUser')!) as User;
    }
  }

  private getBookingEvents() {
    if (this.isAuthenticated) {
      const id: number = this.oursUser.id;
      let list: number[] = [];
      this.bookingService.getBookingsEventIdByUserId(id).subscribe(
        data => {
          list = data;

          for (let i = 0; i < list.length; i++) {
            this.eventIdBookedSet.add(list[i]);
          }

        }, error => {
          alert(error.message);
        }
      )
    }

  }

  private getAllEvents() {
    this.eventService.getAllEvents().subscribe(
      data => {
        this.eventsList = data;
        this.filterEventsList = data;
      }, error => {
        alert(error.message)
      }
    )
  }



  private getAllCategories() {
    this.categoryService.getAllCategories().subscribe(
      data => {
        console.log(data);
        this.AllEventsByCategory = data
      }, error => {
        alert(error.message)
      }
    )
  }

  filterEvents(value:string) {
    const searchValue = value.toLowerCase().trim();
    if (!searchValue) {
      this.filterEventsList = [...this.eventsList];
      return;
    }
    this.filterEventsList = this.eventsList.filter((item: { title: string; description: string; location: string; category: { name: string; }; }) =>
      item.title.toLowerCase().includes(searchValue) ||
      item.description.toLowerCase().includes(searchValue) ||
      item.location.toLowerCase().includes(searchValue) ||
      item.category.name.toLowerCase().includes(searchValue)
    );
  }

  filterByCategory(categoryName: string, id: number): void {
    this.selectedCategory = categoryName;
    if (this.selectedCategory !== 'All') {
      this.getEventsByCategoryId(id);
    } else {
      this.getAllEvents();
    }
  }

  isBooked(id: number): boolean {
    return this.eventIdBookedSet.has(id);
  }
}
