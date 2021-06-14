import { User } from './User'
import { Hotel } from './Hotel'

export class Guest extends User {
  constructor(user) {
    super(user) 
    this.guestBookings = []
    this.valuation = 0
    this.overlook;
  }
  generateHotel() {
    this.overlook = new Hotel()
    this.overlook.generate()
  }

}
