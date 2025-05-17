import {User} from './user';
import {Event} from './event';

export interface Booking {
  id?:number;
  user:User;
  numberOfTickets:number;
  events:Event;
  totalPrice:number;
}
