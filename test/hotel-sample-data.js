import {roomsData, bookingsData} from './sample-data'
import Room from '../src/components/classes/Room'
import Booking from '../src/components/classes/Booking'

let roomCount = 0
const instantiatedRooms = roomsData.reduce((hotel, room) => {
  roomCount++
  const newRoom = new Room(room)
  hotel[`room${roomCount}`] = newRoom
  return hotel
}, {})


let bookingCount = 0
const instantiatedBookings = bookingsData.reduce((hotel, booking) => {
  bookingCount++
  const newBooking = new Booking(booking)
  hotel[`booking${bookingCount}`] = newBooking
  return hotel
}, {})


export {instantiatedRooms as rooms, instantiatedBookings as bookings}