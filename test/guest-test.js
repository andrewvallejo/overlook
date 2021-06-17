import { expect } from 'chai';
import { Guest } from '../src/components/classes/Guest';
import { Hotel} from '../src/components/classes/Hotel';
import { userData } from './data/sample-data'
import {rooms, bookings} from './data/hotel-sample-data'

describe('Guest', () => {
  let guest1
  let hotelRooms, hotelBookings, generate
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
    hotelRooms = [room1, room2, room3, room4, room5]
    hotelBookings = [booking1, booking2, booking3, booking4, booking5]
    generate = () => guest1.generateHotel(hotelRooms, hotelBookings)
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
    generate()
    expect(guest1.overlook).to.be.an.instanceOf(Hotel)
  })
  it('should be able to filter rooms by date', () => {
    generate()
    guest1.filterRoomsByDate('2043/01/01')
    expect(guest1.overlook.availableRooms).to.be.lengthOf(2)
  })
  it('should be able to filter rooms by type', () => {
    generate()
    guest1.overlook.selectDate(['2099/10/31'])
    guest1.overlook.findAvailableRooms()
    expect(guest1.overlook.filteredByTypeRooms).to.be.lengthOf(0)
    guest1.overlook.filterRooms('single room')
    expect(guest1.overlook.filteredByTypeRooms).to.be.lengthOf(2)
    guest1.overlook.findAvailableRooms()
    guest1.overlook.filterRooms('suite')
    expect(guest1.overlook.filteredByTypeRooms).to.be.lengthOf(1)
  })
  it('should be able to book a room', () => {
    generate()
    guest1.overlook.selectDate(['2099/10/31'])
    guest1.overlook.findAvailableRooms()
    expect(guest1.overlook.availableRooms).to.be.lengthOf(5)
    guest1.bookRoom(3)
    expect(guest1.guestBookings).to.be.deep.equal([room3])
  })
})