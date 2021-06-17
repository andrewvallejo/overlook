/* eslint-disable max-len */
import { hide, show } from './components/utility/hideShow'
import { today } from './components/utility/getToday'

// query selectors
const altMsg = document.querySelector('#altMsg')
const altView = document.querySelector('#altView')
const availableRoomsView = document.querySelector('#availableRoomsView')
const btnSortByType = document.querySelector('#btnSortByType')
const dynamicMsg = document.querySelector('#dynamicMsg')
const footerInfo = document.querySelector('#footerInfo')
const guestMenu = document.querySelector('#guestMenu')
const home = document.querySelector('#home')
const loginPortal = document.querySelector('#loginPortal')
const menuHeader = document.querySelector('#menuHeader')
const portal = document.querySelector('#portal')
const typeForm = document.querySelector('#typeForm')
const viewCalendar = document.querySelector('#viewCalendar')

home.addEventListener('click', (event) => {
  event.preventDefault();  
  resetHome()
})

export const resetHome = () => {
  hide([availableRoomsView, viewCalendar, loginPortal])
  show([portal, guestMenu])
}

export const retrieveBook = (guestBook, selectedDate, allBookings) => {
  let filter = ''
  selectedDate === 'myBookings' ? filter = 'myBookings' : filter = 'Date'
  if (selectedDate === today) {
    fetchGuestBookings(guestBook, allBookings)
    prerenderRoom(guestBook, filter, selectedDate)
    hide(portal)
  } else if (new Date(selectedDate).valueOf() <= new Date().valueOf()) {
    showAltView('noRooms')
  } else {
    fetchGuestBookings(guestBook, allBookings)
    prerenderRoom(guestBook, filter, selectedDate)
    hide(portal)
  }
}

const fetchGuestBookings = (guestBook, bookings) => {
  let guest = guestBook[0]  
  let hotelRooms = guest.overlook.rooms
  return bookings.forEach(booking => {
    return hotelRooms.forEach(room => {
      if (booking.userID === guest.id && booking.roomNumber === room.number) {
        room.date = booking.date
        guest.addBookings(room)
      }
    })
  })
}

export const prerenderRoom = (guestBook, filter, query) => {
  availableRoomsView.innerHTML = ''        
  show(availableRoomsView)
  let guest = guestBook[0]
  let availableRooms = guest.overlook.availableRooms
  let filteredRooms = guest.overlook.filteredByTypeRooms
  let guestBookings = guest.guestBookings
  filter === 'Date' ? (guest.filterRoomsByDate(query)) : guest.filterRoomsByType(query) 
  if (filteredRooms.length >= 1)  {
    availableRooms = filteredRooms
  } else if (filter === 'myBookings') {
    availableRooms = guestBookings
  } else if (!availableRooms.length) {
    showAltView('noneAvailable')
  }
  renderRooms(availableRooms, filter)
  renderMsg(filter, guest) 
}

const renderRooms = (availableRooms, filter) => {
  let roomDate 
  let btnBook 
  hide(footerInfo)
  show(btnSortByType) 
  availableRooms.forEach(room => {
    filter === 'myBookings' ? (roomDate = `${(room.date && (`<p>You booked this room for:  <span>${room.date}</span></p>`)) || ''}`, show(footerInfo), hide(btnSortByType))  : roomDate = ''
    filter !== 'myBookings' ? (btnBook = `${`<button id="${room.number}">Book now!</button>`}`)  : btnBook = ''
    availableRoomsView.innerHTML += `
    <article tabindex="0" aria-label="A ${room.roomType} with ${room.numBed} bed(s) that is $${room.costPerNight.toFixed(2)} per night" class="room-card">
    ${roomDate}  
    <p>Room number: <span>${room.number}</span></p>
    <p>Room type: <span>${room.roomType}</span></p>
    <p>Bidet: <span>${room.bidet}</span></p>
    <p>Bed Size: <span>${room.bedSize}</span></p>
    <p>Number of beds: <span>${room.numBeds}</span></p>
    <p>Cost per night: $<span>${room.costPerNight.toFixed(2)}</span></p>
    ${btnBook}
  </article>`
  }) 
}

const renderMsg = (filter, guest) => {
  if (filter === 'myBookings') {
    dynamicMsg.innerHTML = `${guest.name.split(' ')[0]}'s expenditures: $${guest.valuation.toFixed(2)}`
  }
}
 
export const showCalendar = () => {
  menuHeader.innerHTML = `Find Available Rooms`
  hide(guestMenu)
  show(viewCalendar)
}

export const bookedMessage = () => {
  return setTimeout(() => {
    showAltView();
    show([portal, guestMenu])
    hide([altView])
  }, 5000)
}

export const showAltView = (filter) => {
  if (filter === 'Type') {
    altMsg.innerHTML = `search by room type`
    show([altView, typeForm])
    hide([availableRoomsView, viewCalendar, portal])
  } else if (filter === 'noRooms') {
    altMsg.innerHTML = `Only future bookings are allowed. search for a future date`
    show([altView])
    hide([availableRoomsView, viewCalendar, portal, typeForm])
    return setTimeout (() => {
      show([portal, guestMenu])
      hide([altView])
    }, 5000)
  } else if (filter === 'noneAvailable') {
    altMsg.innerHTML = `We are so so so sorry, please try another date!`
    show([altView])
    hide([availableRoomsView, viewCalendar, portal, typeForm])
    return setTimeout (() => {
      show([portal, guestMenu])
      hide([altView])
    }, 5000)
  } else {
    altMsg.innerHTML = 'Booking Approved! Enjoy your stay at the Overlook Hotel!'
    hide([availableRoomsView, viewCalendar, typeForm])
    show([altView])
  } 
}

export const showRoomView = () => {
  hide(altView)
  show(availableRoomsView)
}

export const loginErrorMsg = (username) => {
  username.placeholder = 'Incorrect! try again!'
  return setTimeout (() => {
    username.placeholder = 'Username'
  }, 1500)
}