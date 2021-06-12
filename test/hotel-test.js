import { expect } from 'chai';
import Hotel from '../src/components/classes/Hotel';
import {rooms, bookings} from './hotel-sample-data'

describe.only('Booking', () => {
  let hotel
  let room1, room2, room3
  let booking1, booking2, booking3
  beforeEach(() => {
    room1 = rooms.room1
    room2 = rooms.room2
    room3 = rooms.room3
    booking1 = bookings.book1
    booking2 = bookings.book2
    booking3 = bookings.book3
    hotel = new Hotel()
  })
  it('should be an instantation of Hotel', () => {
    expect(hotel).to.be.an.instanceOf(Hotel)
  })
});
