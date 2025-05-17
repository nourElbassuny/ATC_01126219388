import { Routes } from '@angular/router';
import {LoginComponent} from './components/auth/login/login.component';
import {RigisterComponent} from './components/auth/rigister/rigister.component';
import {EventsComponent} from './components/events/events.component';
import {adminGuard} from './users.guard';
import {EventDetailsComponent} from './components/event-details/event-details.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {AddEventComponent} from './components/add-event/add-event.component';

export const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:`dashboard/addEvent/:id`,component:AddEventComponent,canActivate:[adminGuard]},
  {path:'dashboard/addEvent',component:AddEventComponent,canActivate:[adminGuard]},
  {path:'register',component:RigisterComponent},
  {path:'dashboard',component:DashboardComponent,canActivate:[adminGuard]},
  {path:'auth/eventDetail/:id',component:EventDetailsComponent},
  {path:'',component:EventsComponent },
  {path:'**',component:EventsComponent}
];
