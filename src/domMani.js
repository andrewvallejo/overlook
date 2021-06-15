import { today } from './components/utility/getToday'
// query selectors
const availableRoomsToday = document.querySelector('#availableRoomsToday');




export const retrieveBook = (guestBook) => {
  // let guest = guestBook[0]
  // renderTodaysRooms(guestBook)
  renderRoomsByDate(guestBook)
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


const renderRoomsByDate = (guestBook) => {
  let guest = guestBook[0]
  guest.filterRoomsByDate('2020/02/04')
  console.log(guest.overlook.availableRooms)
  // let availableRooms = [...new Set(guest.overlook.availableRooms)]
  guest.overlook.availableRooms.forEach(room => {
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