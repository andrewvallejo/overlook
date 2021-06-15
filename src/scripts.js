import './css/styles.scss';
import {fetchHotelData} from './apiCalls'
import { Guest } from './components/classes/Guest'
import { retrieveBook, showCalendar} from './domMani'
import { today } from './components/utility/getToday'

// global varibles and exports
export let guestBook, allBookings


// querySelectors
const btnLogin = document.querySelector('#btnLogin')
const btnViewTodayRooms = document.querySelector('#btnViewTodayRooms')
const btnViewDateRooms = document.querySelector('#btnViewDateRooms')
const btnViewMyBookings = document.querySelector('#btnViewMyBookings')
const btnChooseDate = document.querySelector('#btnChooseDate')
const dateSelector = document.querySelector('#dateSelector')

// event listeners
btnViewTodayRooms.addEventListener('click', (event) => {
  event.preventDefault();  
  instantiateHotel(today)
})

btnViewDateRooms.addEventListener('click', (event) => {
  event.preventDefault();  
  showCalendar()
})

btnChooseDate.addEventListener('click', (event) => {
  event.preventDefault();  
  const calDate = dateSelector.value.split('-').join('/')
  instantiateHotel(calDate)
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

