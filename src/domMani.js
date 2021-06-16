/* eslint-disable max-len */
import { hide, show } from './components/utility/hideShow'

// query selectors
const home = document.querySelector('#home')
const btnSortByType = document.querySelector('#btnSortByType')
const altMsg = document.querySelector('#altMsg')
const footerInfo = document.querySelector('#footerInfo')
const portal = document.querySelector('#portal')
const availableRoomsView = document.querySelector('#availableRoomsView')
const guestMenu = document.querySelector('#guestMenu')
const viewCalendar = document.querySelector('#viewCalendar')
const menuHeader = document.querySelector('#menuHeader')
const dynamicMsg = document.querySelector('#dynamicMsg')
const altView = document.querySelector('#altView')
const loginPortal = document.querySelector('#loginPortal')

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
  fetchGuestBookings(guestBook, allBookings)
  prerenderRoom(guestBook, filter, selectedDate)
  hide(portal)
  show(availableRoomsView)
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
  let guest = guestBook[0]
  let availableRooms = guest.overlook.availableRooms
  let filteredRooms = guest.overlook.filteredByTypeRooms
  let guestBookings = guest.guestBookings
  filter === 'Date' ? (guest.filterRoomsByDate(query)) : guest.filterRoomsByType(query) 
  if (filteredRooms.length >= 1)  {
    availableRooms = filteredRooms
  } else if (filter === 'myBookings') {
    availableRooms = guestBookings
  }
  renderRooms(availableRooms, filter)
  renderMsg(filter, guest) 
}

const renderRooms = (availableRooms, filter) => {
  let roomDate 
  hide(footerInfo)
  show(btnSortByType)
  availableRooms.forEach(room => {
    filter === 'myBookings' ? (roomDate = `${(room.date && (`<p>You booked this room for:  <span>${room.date}</span></p>`)) || ''}`, show(footerInfo), hide(btnSortByType))  : roomDate = ''
    availableRoomsView.innerHTML += `
    <article id="${room.number}" tabindex="0" aria-label="A ${room.roomType} with ${room.numBed} bed(s) that is $${room.costPerNight.toFixed(2)} per night" class="room-card">
    ${roomDate}  
    <p>Room number: <span>${room.number}</span></p>
    <p>Room type: <span>${room.roomType}</span></p>
    <p>Bidet: <span>${room.bidet}</span></p>
    <p>Bed Size: <span>${room.bedSize}</span></p>
    <p>Number of beds: <span>${room.numBeds}</span></p>
    <p>Cost per night: $<span>${room.costPerNight.toFixed(2)}</span></p>
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

export const showTypeMenu = () => [
  menuHeader.innerHTML = `Filter`
] 

export const bookedMessage = () => {
  return setTimeout(() => {
    showAltView();
    dynamicMsg.innerHTML = 'Booked!'
    show([portal, guestMenu])
    hide([altView])
  }, 5000)
}

export const showAltView = (filter) => {
  if (filter === 'Type') {
    altMsg.innerHTML = `search by room type`
    
  }
  hide([availableRoomsView, viewCalendar])
  show([altView])
} 

