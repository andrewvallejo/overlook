/* eslint-disable max-len */
import { today } from './components/utility/getToday'
import { hide, show } from './components/utility/hideShow'

// query selectors
const availableRoomsToday = document.querySelector('#availableRoomsToday');
const portal = document.querySelector('#portal')
const availableRoomsView = document.querySelector('#availableRoomsView')

export const retrieveBook = (guestBook, selectedDate) => {
  prerenderRoom(guestBook, 'Date', selectedDate)
  hideView(selectedDate)
  showView(selectedDate)
}

const prerenderRoom = (guestBook, filter, query) => {
  availableRoomsView.innerHTML = ''        
  let guest = guestBook[0]
  let availableRooms = guest.overlook.availableRooms
  let filteredRooms = guest.overlook.filteredByTypeRooms
  filter === 'Date' ? guest.filterRoomsByDate(query) : guest.filterRoomsByType(query)
  if (filteredRooms.length >= 1) {
    availableRooms = filteredRooms
  }
  renderRooms(availableRooms)
}

const renderRooms = (availableRooms) => {
  availableRooms.forEach(room => {
    availableRoomsView.innerHTML += `     
    <article id="availableRoomsToday" aria-label="List of all available rooms for today" class="room-card">
    <p>Room number: <span>${room.number}</span></p>
    <p>Room type: <span>${room.roomType}</span></p>
    <p>Bidet: <span>${room.bidet}</span></p>
    <p>Bed Size: <span>${room.bedSize}</span></p>
    <p>Number of beds: <span>${room.numBeds}</span></p>
    <p>Cost per night: $<span>${room.costPerNight.toFixed(2) }</span></p>
  </article>`
  }) 
}

const hideView = (selectedDate) => {
  if (selectedDate === today) {
    hide([portal])
  }
}

const showView = (selectedDate) => {
  if (selectedDate === today) {
    show(availableRoomsView)
  }
}

// const renderTodaysRooms = (guestbook) => {
//   let guest = guestbook[0]
//   guest.overlook.selectDate(today)
//   guest.overlook.findAvailableRooms() 
//   let availableRooms = [...new Set(guest.overlook.availableRooms)]
//   availableRooms.forEach(room => {
//     availableRoomsToday.innerHTML += `     
//     <li aria-label="Room and their properties">
//     <p>Room number: <span>${room.number}</span></p>
//     <p>Room type: <span>${room.roomType}</span></p>
//     <p>Bidet: <span>${room.bidet}</span></p>
//     <p>Bed Size: <span>${room.bedSize}</span></p>
//     <p>Number of beds: <span>${room.numBeds}</span></p>
//     <p>Cost per night: $<span>${room.costPerNight.toFixed(2) }</span></p>
//   </li>`
//   }) 
// } 


// const renderRoomsByType = (guestBook) => {
//   availableRoomsToday.innerHTML = ``
//   let guest = guestBook[0]
//   guest.filterRoomsByType('suite') 
//   guest.overlook.availableRooms.forEach(room => {
//     availableRoomsToday.innerHTML += `     
//     <li aria-label="Room and their properties">
//     <p>Room number: <span>${room.number}</span></p>
//     <p>Room type: <span>${room.roomType}</span></p>
//     <p>Bidet: <span>${room.bidet}</span></p>
//     <p>Bed Size: <span>${room.bedSize}</span></p>
//     <p>Number of beds: <span>${room.numBeds}</span></p>
//     <p>Cost per night: $<span>${room.costPerNight.toFixed(2) }</span></p>
//   </li>`
//   }) 
// }