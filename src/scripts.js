/* eslint-disable max-len */
import './css/styles.scss';
import {fetchHotelData, postHotelData} from './apiCalls'
import { Guest } from './components/classes/Guest'
import { showAltView, showRoomView, retrieveBook, showCalendar, bookedMessage, resetHome, prerenderRoom, loginErrorMsg} from './domMani'
import { today } from './components/utility/getToday'

// global varibles and exports
export let guestBook, allBookings, currentGuest

// querySelectors
const availableRooms = document.querySelector('#availableRoomsView')
const btnLogin = document.querySelector('#btnLogin')
const btnChooseDate = document.querySelector('#btnChooseDate')
const btnChooseType = document.querySelector('#btnChooseType')
const btnSortByType = document.querySelector('#btnSortByType')
const btnViewMyBookings = document.querySelector('#btnViewMyBookings')
const btnViewDateRooms = document.querySelector('#btnViewDateRooms')
const btnViewTodayRooms = document.querySelector('#btnViewTodayRooms')
const dateSelector = document.querySelector('#dateSelector')
const password = document.querySelector('#password')
const typeChoice = document.querySelectorAll('input[type="radio"]')
const username = document.querySelector('#username')

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

btnChooseType.addEventListener('click', (event) => {
  event.preventDefault();  
  let type = detectType()
  prerenderRoom(guestBook, 'Type', type)
  prerenderRoom(guestBook, 'Type', type)
  showRoomView()
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

btnSortByType.addEventListener('click', (event) => {
  event.preventDefault()
  showAltView('Type')
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
      loginErrorMsg(username)
    }
  })
}

// instantiation functions

function instaniateGuestbook() {
  fetchHotelData()
    .then(promise => {
      guestBook = promise[0].customers.map(user => new Guest(user)) 
    })
  return guestBook
}

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


const filterBookingsByDate = (bookings, date)  => {
  return bookings.filter(booking => {
    if (booking.date.includes(date)) {
      return booking
    }
  })
}

// booking functions
function fetchBookingData(event) {
  if (event.target.closest('button')) {
    let userID = guestBook[0].id
    let date = guestBook[0].overlook.date
    let roomNumber = parseInt(event.target.closest('button').id)
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
        showAltView('Booking');
      }, 1000)
    })
} 

const detectType = () => {
  let type;
  typeChoice.forEach(choice => {
    if (choice.checked) {
      type = choice.value
    }
  })
  return type
}
