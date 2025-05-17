export interface  User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: string;
  bookings: any[];
  enabled: boolean;
  authorities: { authority: string }[];
  username: string;
  accountNonLocked: boolean;
  accountNonExpired: boolean;
  credentialsNonExpired: boolean;

}
