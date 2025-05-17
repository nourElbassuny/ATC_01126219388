import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {Event} from '../../models/event';
import {EventService} from '../../services/event.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-dashboard',
  imports: [
    RouterLink,
    FormsModule,
    NgForOf,
    DatePipe,
    NgIf
  ],
  templateUrl: './dashboard.component.html',
  standalone: true,
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  searchTerm: any;
  eventList!: Event[];
  filteredEvents: Event[] = [];


  selectedEvent!: Event;

  constructor(private eventService: EventService, private router:Router) {
  }

  ngOnInit() {
    this.getAllEvents();
  }

  private getAllEvents() {
    this.eventService.getAllEvents().subscribe(
      data => {
        this.eventList = data;
        this.filteredEvents=[...data];
      }, error => {
        alert(error.message)
      }
    )
  }

  private refreshDashboard(): void {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate(['/dashboard']);
    });
  }

  filterEvents(value:string) {
    const searchValue = value.toLowerCase().trim();
    if (!searchValue){
      this.filteredEvents=[...this.eventList];
      return
    }
    this.filteredEvents=this.eventList.filter(item =>
      item.title.toLowerCase().includes(searchValue) ||
      item.description.toLowerCase().includes(searchValue) ||
      item.category.name.toLowerCase().includes(searchValue) ||
      item.location.toLowerCase().includes(searchValue)
    )
  }



  deleteEvent(eventId: number) {
    this.eventService.deleteEventById(eventId).subscribe(
      data=>{
        this.refreshDashboard();
      },error => {
        alert(error.message);
      }
    );

  }

  openDeleteModel(event: Event) {
    this.selectedEvent = event;
  }


}
