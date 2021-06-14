import { User } from './components/classes/User'
import { Room } from './components/classes/Room'
import { Bookings } from './components/classes/Booking'

let usersData, roomsData, bookingsData

let users = () => fetch("http://localhost:3001/api/v1/customers")
  .then(response => response.json())
  .catch(err => console.log('error'));
let rooms = () => fetch("http://localhost:3001/api/v1/ingredients")
  .then(response => response.json())
  .catch(err => console.log('error'));
let bookings = () => fetch("http://localhost:3001/api/v1/recipes")
  .then(response => response.json())
  .catch(err => console.log('error'));

export const retrieveData = () => {
  return Promise.all([users(), rooms(), bookings()])
}

