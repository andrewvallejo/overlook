import {roomsData, bookingsData} from './sample-data'
import { Room } from '../../src/components/classes/Room'
import { Booking } from '../../src/components/classes/Booking'

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

const findDate = () => {
  const today = new Date()
  let dd = today.getDate()
  let mm = today.getMonth() + 1
  const yyyy = today.getFullYear()
  if (dd < 10) {
    dd = `0${dd}` 
  } else if (mm < 10) {
    (
      mm = `0${mm}`
    )
  }  
  return `${yyyy}/${mm}/${dd}`
}    

const todaysDate = findDate()


export {
  instantiatedRooms as rooms,
  instantiatedBookings as bookings,
  todaysDate as today
}