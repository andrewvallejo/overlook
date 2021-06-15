import './css/styles.scss';
import {fetchHotelData} from './apiCalls'
import { Guest } from './components/classes/Guest'
import { retrieveBook } from './domMani'

export let guestBook, sendData

window.onload = () => {
  fetchHotelData()
}

fetchHotelData()
  .then(promise => {
    guestBook = promise[0].customers.map(user => new Guest(user))
    guestBook.map(guest => {
      return guest.generateHotel(promise[1].rooms, promise[2].bookings)
    })
    retrieveBook(guestBook)
  })

  
