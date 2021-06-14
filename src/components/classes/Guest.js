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
  filterRoomsByDate(date) {
    this.overlook.selectDate(date)
    this.overlook.findAvailableRooms()
  }
  filterRoomsByType(type) {
    this.overlook.filerRooms(type)
  }
  bookRoom(number) {
    this.guestBookings = this.overlook.availableRooms.filter(room => {
      if (room.number === number) {
        return room
      }
    })
  }
}
