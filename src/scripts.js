/* eslint-disable max-len */
import './css/styles.scss';
import {fetchHotelData, postHotelData} from './apiCalls'
import { Guest } from './components/classes/Guest'
import { removeRoom, retrieveBook, showCalendar, bookedMessage, resetHome} from './domMani'
import { today } from './components/utility/getToday'

// global varibles and exports
export let guestBook, allBookings, currentGuest

// querySelectors
const btnLogin = document.querySelector('#btnLogin')
const btnViewTodayRooms = document.querySelector('#btnViewTodayRooms')
const btnViewDateRooms = document.querySelector('#btnViewDateRooms')
const btnViewMyBookings = document.querySelector('#btnViewMyBookings')
const btnChooseDate = document.querySelector('#btnChooseDate')
const dateSelector = document.querySelector('#dateSelector')
const availableRooms = document.querySelector('#availableRoomsView')
const username = document.querySelector('#username')
const password = document.querySelector('#password')

// event listeners
window.addEventListener('load', instaniateGuestbook)

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

btnViewMyBookings.addEventListener('click', (event) => {
  event.preventDefault();  
  instantiateHotel('myBookings')
})

availableRooms.addEventListener('click', (event) => {
  event.preventDefault();  
  fetchBookingData(event)
})

btnLogin.addEventListener('click', (event) => {
  event.preventDefault();  
  verifyLogin()
})


/// login functions 

const verifyLogin = () => {
  instaniateGuestbook()
  let isUsernameValid = false
  let isPasswordValid = false
  guestBook.forEach(guest => {
    if (guest.username === username.value && password.value === 'overlook2021') {
      isPasswordValid = true
      isUsernameValid = true
    }
    if (isUsernameValid && isPasswordValid) {
      resetHome()
    } else {
      console.log('failed to login')
    }
  })
}

// instantiation functions
function instantiateHotel(selectedDate) {
  fetchHotelData(selectedDate)
    .then(promise => {
      guestBook = promise[0].customers.map(user => new Guest(user)) 
      allBookings = promise[2].bookings
      const filteredBookings = filterBookingsByDate(allBookings, selectedDate)
      guestBook.map(guest => {
        return guest.generateHotel(promise[1].rooms, filteredBookings)
      })
      retrieveBook(guestBook, selectedDate, allBookings)
    }) 
    .catch(error => {
      console.log('Sorry, servers are down')
    })
} 

function instaniateGuestbook() {
  fetchHotelData()
    .then(promise => {
      guestBook = promise[0].customers.map(user => new Guest(user)) 
    })
  return guestBook
}

const filterBookingsByDate = (bookings, date)  => {
  return bookings.filter(booking => {
    if (booking.date.includes(date)) {
      return booking
    }
  })
}

// booking functions
function fetchBookingData(event) {
  if (event.target.closest('article')) {
    let userID = guestBook[0].id
    let date = guestBook[0].overlook.date
    let roomNumber = parseInt(event.target.closest('article').id)
    const postData = {
      userID,
      date,
      roomNumber
    }
    postBookingData(postData)
  }
} 

const postBookingData = (postData) => {
  postHotelData(postData)
    .then(response => {
      if (!response.ok) {
        return new Error()
      } else {
        return response.json()
      }
    })
    .then(success => {
      console.log('Success!')
      guestBook[0].addBooking
      bookedMessage()
      return setTimeout(() => {
        removeRoom();
      }, 1000)
    })
} 

