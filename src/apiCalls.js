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

