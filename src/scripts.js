import './css/styles.scss';
import {fetchHotelData} from './apiCalls'
import { Guest } from './components/classes/Guest'

let guestBook

window.onload = () => {
  fetchHotelData()
    .then(promise => {
      guestBook = promise[0].customers.map(user => new Guest(user))
      guestBook.map(guest => {
        guest.generateHotel(promise[1].rooms, promise[2].bookings)
      })
    })
}