import { expect } from 'chai';
import { Hotel} from '../src/components/classes/Hotel';
import {rooms, bookings, today} from './data/hotel-sample-data'

describe.only('Booking', () => {
  let hotel, hotelRooms, hotelBookings
  let room1, room2, room3, room4, room5
  let booking1, booking2, booking3, booking4, booking5
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
    hotelRooms = [room1, room2, room3, room4, room5]
    hotelBookings = [booking1, booking2, booking3, booking4, booking5]
    hotel = new Hotel()
  })
  it('should be an instantation of Hotel', () => {
    expect(hotel).to.be.an.instanceOf(Hotel)
  })
  it('should have the a default date of 2000/12/25', () => {
    expect(hotel.date).to.be.deep.equal('2000/12/25')
  })
  it('should be a default of an empty array for rooms', () => {
    expect(hotel.rooms).to.be.deep.equal([])
  })
  it('should be a default of an empty array for bookings', () => {
    expect(hotel.bookings).to.be.deep.equal([])
  })
  it('should be a default of an empty array for rooms available', () => {
    expect(hotel.availableRooms).to.be.deep.equal([])
  })
  it('should be a default of an empty array for pending bookings', () => {
    expect(hotel.pendingBookings).to.be.deep.equal([])
  })
  it('should be a default of 0 for percentage of rooms available', () => {
    expect(hotel.availability).to.be.deep.equal(0)
  })
  it('should be able to instaniate all of the rooms', () => {
    expect(hotel.rooms).to.be.deep.equal([])
    hotel.generateRooms(hotelRooms)
    expect(hotel.rooms).to.be.lengthOf(5)
    expect(hotel.rooms).to.be.deep.equal(hotelRooms)
  })
  it.skip('should be able to instaniate all of the bookings', () => {
    expect(hotel.bookings).to.be.deep.equal([])
    hotel.generateBookings()
    expect(hotel.bookings).to.be.lengthOf(5)
    expect(hotel.bookings).to.be.deep.equal(hotelBookings)
  })
  it.skip('should be to update date property to current date', () => {
    expect(hotel.date).to.be.equal('2000/12/25')
    hotel.fetchCurrentDate()
    expect(hotel.date).to.be.equal(today)
  })
  it.skip('should be able to update the date to a future date', () => {
    expect(hotel.date).to.be.equal('2000/12/25')
    hotel.selectDate('2022/03/09')
    expect(hotel.date).to.be.equal('2022/03/09')
  })
  it.skip('should not be able to update the date to a before today', () => {
    expect(hotel.date).to.be.equal('2000/12/25')
    hotel.selectDate('2019/11/22')
    expect(hotel.date).to.be.equal('2000/12/25')
  })
});

