import { Booking } from './Booking'
import { Room } from './Room'

export class Hotel {
  constructor() {
    this.date = '2000/12/25',
    this.rooms = [],
    this.bookings = [],
    this.availableRooms = [],
    this.filteredByTypeRooms = []
    this.pendingBookings = [],
    this.availability = 0
  }
  generate(hotelRooms, hotelBookings) {
    this.generateRooms(hotelRooms)
    this.generateBookings(hotelBookings)
  }
  generateRooms(hotelRooms) {
    hotelRooms.forEach(room => {
      this.rooms.push(new Room(room))
    }) 
  }
  generateBookings(hotelBookings) {
    hotelBookings.forEach(booking => {
      this.bookings.push(new Booking(booking))
    })
  }
  parseDate(date) {
    let dd = date.getDate()
    let mm = date.getMonth() + 1
    const yyyy = date.getFullYear()
    dd < 10 ? dd = `0${dd}` : null
    mm < 10 ? mm = `0${mm}` : null     
    this.date = `${yyyy}/${mm}/${dd}`
  }
  selectDate(date) {
    if (new Date(date).valueOf() === new Date().valueOf()) {
      const today = new Date()
      this.parseDate(today)
    } else if (new Date(date).valueOf() > new Date().valueOf()) {
      const futureDate = new Date(date)
      this.parseDate(futureDate)
    } else {
      const today = new Date()
      this.parseDate(today)
    }
  }
  findAvailableRooms() {
    this.filteredByTypeRooms = []
    return this.rooms.forEach(room => { 
      this.bookings.forEach(booking => {
        if (booking.date === this.date && booking.roomNumber === room.number) {
          room.isBooked = true
        }
      })
      if (!room.isBooked) {
        this.availableRooms.push(room)
      } else if (!this.availableRooms) {
        this.availableRooms.push(room)
      }
    })
  }
  filterRooms(type) {
    this.filteredByTypeRooms = []
    return this.availableRooms.forEach(room => {
      if (room.roomType === type && !this.filteredByTypeRooms.includes(room)) {
        this.filteredByTypeRooms.push(room)
      }
    })
  }
}