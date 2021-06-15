// query selectors

const availableRoomsToday = document.querySelector('#availableRoomsToday');

// global variables
export const retrieveBook = (guestBook) => {
  analyzeBook(guestBook[0])
}

const analyzeBook = (guest) => {
  let rooms = guest.overlook.rooms
  let bookings = guest.overlook.bookings
  renderRooms(rooms)
}

const renderRooms = (rooms) => {
  
} 




