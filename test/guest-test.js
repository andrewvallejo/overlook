import { expect } from 'chai';
import { Guest } from '../src/components/classes/Guest';
import { Hotel} from '../src/components/classes/Hotel';
import { userData } from './data/sample-data'
import {rooms, bookings, today} from './data/hotel-sample-data'

describe.only('Guest', () => {
  let guest1
  let hotel, hotelRooms, hotelBookings, singleRooms, generate
  let room1, room2, room3, room4, room5
  let booking1, booking2, booking3, booking4, booking5
  beforeEach(() => {
    guest1 = new Guest(userData[0])
    room1 = rooms.room1
    room2 = rooms.room2
    room3 = rooms.room3
    room4 = rooms.room4
    room5 = rooms.room5
    booking1 = bookings.booking1
    booking2 = bookings.booking2
    booking3 = bookings.booking3
    booking4 = bookings.booking4
    booking5 = bookings.booking5
    singleRooms = [room4, room5]
    hotelRooms = [room1, room2, room3, room4, room5]
    hotelBookings = [booking1, booking2, booking3, booking4, booking5]
    guest1.generateHotel()
  })
  it('should be an instantation of a Guest', () => {
    expect(guest1).to.be.an.instanceOf(Guest)
  })
  it('should have an empty array as default for purchased bookings', () => {
    expect(guest1.guestBookings).to.be.deep.equal([])
  })
  it('should have a default of 0 for total cost of guestBookings', () => {
    expect(guest1.valuation).to.be.deep.equal(0)
  })
  it('should have a property with the instantation of Hotel', () => {
    guest1.generateHotel()
    expect(guest1.overlook).to.be.an.instanceOf(Hotel)
  })
})
