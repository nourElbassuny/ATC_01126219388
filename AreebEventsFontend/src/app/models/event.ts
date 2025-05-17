import {Category} from './category';
import {Booking} from './booking';

export interface  Event {
  id:number;
  title:string;
  description:string;
  location:string;
  date:Date;
  photo:string;
  category:Category;
  bookings:Booking[];
  isBooked:boolean;
  price:number;
}
