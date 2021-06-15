import './css/styles.scss';
import {fetchHotelData} from './apiCalls'
import { Guest } from './components/classes/Guest'
import { retrieveBook } from './domMani'
import { today } from './components/utility/getToday'

// global varibles and exports
export let guestBook, allBookings
let selectedDate = []


// querySelectors
const btnLogin = document.querySelector('#btnLogin')
const btnViewTodayRooms = document.querySelector('#btnViewTodayRooms')
const btnViewDateRooms = document.querySelector('#btnViewDateRooms')
const btnViewMyBookings = document.querySelector('#btnViewMyBookings')
const portal = document.querySelector('#portal')


// event listeners
btnViewTodayRooms.addEventListener('click', (event) => {
  event.preventDefault();  
  instantiateHotel(today)
})

btnViewDateRooms.addEventListener('click', (event) => {
  event.preventDefault();  
  instantiateHotel('2020/01/25')
})


function instantiateHotel(selectedDate) {
  fetchHotelData(selectedDate)
    .then(promise => {
      guestBook = promise[0].customers.map(user => new Guest(user)) 
      allBookings = promise[2].bookings
      const filteredBookings = filterBookingsByDate(allBookings, selectedDate)
      guestBook.map(guest => {
        return guest.generateHotel(promise[1].rooms, filteredBookings)
      })
      retrieveBook(guestBook, selectedDate)
    })
}

const filterBookingsByDate = (bookings, date)  => {
  return bookings.filter(booking => {
    if (booking.date.includes(date)) {
      return booking
    }
  })
}

