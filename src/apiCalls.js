let usersData = () => fetch("http://localhost:3001/api/v1/customers")
  .then(response => response.json())
  .catch(err => console.log('error'));

let roomsData = () => fetch("http://localhost:3001/api/v1/ingredients")
  .then(response => response.json())
  .catch(err => console.log('error'));

let bookingsData = () => fetch("http://localhost:3001/api/v1/recipes")
  .then(response => response.json())
  .catch(err => console.log('error'));

function retrieveData() {
  return Promise.all([usersData(), roomsData(), bookingsData()])
}

export default {retrieveData};
