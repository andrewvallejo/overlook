import { User } from './User'
import Hotel from './Hotel'

export class Guest extends User {
  constructor(user) {
    super(user) 
    this.guestBookings = []
    this.valuation = 0
    this.overLook;
  }
  generateHotel() {
    this.overLook = new Hotel()
  }
}
