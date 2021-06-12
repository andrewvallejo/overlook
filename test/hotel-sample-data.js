import {roomsData, bookingsData} from './sample-data'
import Room from '../src/components/classes/Room'
import Booking from '../src/components/classes/Booking'

let roomCount = 0
const instantiateRooms = () => {
  return roomsData.reduce((hotel, room) => {
    roomCount++
    const newRoom = new Room(room)
    hotel[`room${roomCount}`] = newRoom
    console.log(hotel)
    return hotel
  }, {})
}

let bookingCount = 0
const instantiateBookings = () => {
  return bookingsData.reduce((hotel, booking) => {
    bookingCount++
    const newBooking = new Booking(booking)
    hotel[`booking${bookingCount}`] = newBooking
    console.log(hotel)
    return hotel
  }, {})
}

export {instantiateRooms as rooms, instantiateBookings as bookings}