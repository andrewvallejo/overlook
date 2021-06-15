/* eslint-disable max-len */
import { today } from './components/utility/getToday'
import { hide, show } from './components/utility/hideShow'

// query selectors
const portal = document.querySelector('#portal')
const availableRoomsView = document.querySelector('#availableRoomsView')

export const retrieveBook = (guestBook, selectedDate) => {
  console.log(selectedDate)
  prerenderRoom(guestBook, 'Date', selectedDate)
  hideView()
  showView()
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

const hideView = () => {
  hide(portal)
}

const showView = () => {
  show(availableRoomsView)
}