import { expect } from 'chai';
import Hotel from '../src/components/classes/Hotel';
import {rooms, bookings, today} from './data/hotel-sample-data'

describe.only('Booking', () => {
  let hotel
  let room1, room2, room3, room4, room5
  let booking1, booking2, booking3, booking4, booking5
  const hotelRooms = [room1, room2, room3, room4, room5]
  const hotelBookings = [booking1, booking2, booking3, booking4, booking5]
  beforeEach(() => {
    room1 = rooms.room1
    room2 = rooms.room2
    room3 = rooms.room3
    room4 = rooms.room4
    room5 = rooms.room5
    booking1 = bookings.book1
    booking2 = bookings.book2
    booking3 = bookings.book3
    booking4 = bookings.book4
    booking5 = bookings.book5
    hotel = new Hotel()
  })
  it('should be an instantation of Hotel', () => {
    expect(hotel).to.be.an.instanceOf(Hotel)
  })
});

