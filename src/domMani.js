import { today } from './components/utility/getToday'
// query selectors
const availableRoomsToday = document.querySelector('#availableRoomsToday');




export const retrieveBook = (guestBook) => {
  // let guest = guestBook[0]
  // renderTodaysRooms(guestBook)
  // renderRoomsByDate(guestBook)
  // renderRoomsByType(guestBook)
  renderRoom(guestBook, 'Date', '2020/04/22')
}


const renderRoom = (guestBook, filter, query) => {
  availableRoomsToday.innerHTML = ''
  let guest = guestBook[0]
  let availableRooms = guest.overlook.availableRooms
  filter === 'Date' ? guest.filterRoomsByDate(query) : 
    guest.filterRoomsByType(query)
  // !guest.overlook.pending ? availableRooms = guest.overlook.rooms : null
  console.log(availableRooms)
  availableRooms.forEach(room => {
    availableRoomsToday.innerHTML += `     
    <li aria-label="Room and their properties">
    <p>Room number: <span>${room.number}</span></p>
    <p>Room type: <span>${room.roomType}</span></p>
    <p>Bidet: <span>${room.bidet}</span></p>
    <p>Bed Size: <span>${room.bedSize}</span></p>
    <p>Number of beds: <span>${room.numBeds}</span></p>
    <p>Cost per night: $<span>${room.costPerNight.toFixed(2) }</span></p>
  </li>`
  }) 
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