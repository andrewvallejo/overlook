import './css/styles.scss';
import {fetchData} from './apiCalls'
import { Guest } from './components/classes/Guest'

let guestBook

window.onload = () => {
  fetchData()
    .then(promise => {
      guestBook = promise[0].customers.map(user => new Guest(user))
      guestBook.map(guest => {
        guest.generateHotel(promise[1].rooms, promise[2].bookings)
      })
    })
}