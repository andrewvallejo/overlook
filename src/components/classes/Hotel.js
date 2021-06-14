import { Booking } from './Booking'
import { Room } from './Room'
import {roomsData, bookingsData} from '../../../test/data/sample-data'


export class Hotel {
  constructor() {
    this.date = '2000/12/25',
    this.rooms = [],
    this.bookings = [],
    this.availableRooms = [],
    this.pendingBookings = [],
    this.availability = 0
  }
  generate() {
    this.generateRooms()
    this.generateBookings()
  }
  generateRooms() {
    roomsData.forEach(room => {
      this.rooms.push(new Room(room))
    }) 
  }
  generateBookings() {
    bookingsData.forEach(booking => {
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
    if (new Date(date).valueOf() < new Date().valueOf()) {
      const today = new Date()
      this.parseDate(today)
    } else {
      const futureDate = new Date(date)
      this.parseDate(futureDate)
    }
  }
  findAvailableRooms() {
    this.availableRooms = this.rooms.reduce((vacantRooms, room) => { 
      this.bookings.forEach(booking => {
        if (booking.date !== this.date && booking.roomNumber === room.number) {
          vacantRooms.push(room)
        }
      })
      return vacantRooms
    }, [])
  }
  filterRooms(type) {
    return this.availableRooms = this.availableRooms.filter(room => {
      if (room.roomType === type) {
        return room 
      }
    })
  }
}
