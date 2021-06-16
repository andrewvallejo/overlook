const fetchData = (query) => fetch(`http://localhost:3001/api/v1/${query}`)
  .then(response => response.json())
  .catch(err => console.log('error'))

export const fetchHotelData = () => {
  return Promise.all([
    fetchData('customers'), 
    fetchData('rooms'), 
    fetchData('bookings')
  ])
}

export const postHotelData = (data) => {
  let body = {
    'userID': data.userID,
    'date': data.date,
    'roomNumber': data.roomNumber
  }
  return fetch(`http://localhost:3001/api/v1/bookings`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-type': 'application/json'
    }
  })
};
