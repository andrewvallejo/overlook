import { expect } from 'chai';
import { Hotel} from '../src/components/classes/Hotel';
import {rooms, bookings, today} from './data/hotel-sample-data'

describe('Hotel', () => {
  let hotel, hotelRooms, hotelBookings, singleRooms, generateHotel
  let room1, room2, room3, room4, room5
  let booking1, booking2, booking3, booking4, booking5
  beforeEach(() => {
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
    hotel = new Hotel()
    generateHotel = () => {
      hotel.generateRooms(hotelRooms)
      hotel.generateBookings(hotelBookings)
    }

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
  it('should be able to instaniate all of the bookings', () => {
    expect(hotel.bookings).to.be.deep.equal([])
    hotel.generateBookings(hotelBookings)
    expect(hotel.bookings).to.be.lengthOf(5)
    expect(hotel.bookings).to.be.deep.equal(hotelBookings)
  })
  it('should be able update the date to today', () => {
    expect(hotel.date).to.be.equal('2000/12/25')
    hotel.selectDate(today)
    expect(hotel.date).to.be.equal(today)
  })
  it('should be able to update the date to a future date', () => {
    expect(hotel.date).to.be.equal('2000/12/25')
    hotel.selectDate('2022/03/09')
    expect(hotel.date).to.be.equal('2022/03/09')
  })
  it('should not be able to update the date to a before today', () => {
    hotel.selectDate('2019/11/22')
    expect(hotel.date).to.be.equal(today)
  })
  it('should be be able show all available rooms for today', () => {
    generateHotel()
    expect(hotel.availability).to.be.equal(0)
    hotel.selectDate(today)
    hotel.findAvailableRooms()
    expect(hotel.availableRooms).to.be.lengthOf(5)
  })
  it('should be able to filter rooms by its type', () => {
    generateHotel()
    hotel.selectDate(['2099/10/31'])
    hotel.findAvailableRooms()
    expect(hotel.filteredByTypeRooms).to.be.lengthOf(0)
    hotel.filterRooms('single room')
    expect(hotel.filteredByTypeRooms).to.be.lengthOf(2)
    hotel.selectDate(['2099/10/31'])
    hotel.findAvailableRooms()
    hotel.filterRooms('suite')
    expect(hotel.filteredByTypeRooms).to.be.lengthOf(1)
  })
  it.skip('should be able to show all available rooms on a future date', () => {
    generateHotel()
    expect(hotel.availability).to.be.equal(0)
    hotel.selectDate('2043/01/01')
    hotel.findAvailableRooms()
    expect(hotel.availableRooms).to.be.lengthOf(2)
    hotel.selectDate('2022/09/05')
    hotel.findAvailableRooms()
    expect(hotel.availableRooms).to.be.lengthOf(3)
    hotel.selectDate('2022/10/05')
    hotel.findAvailableRooms()
    expect(hotel.availableRooms).to.be.lengthOf(5)

  })
  it.skip('should be able to show percentage of booked rooms on date', () => {
    generateHotel()
    hotel.selectDate('2043/01/01')
    hotel.findAvailableRooms()
    expect(hotel.availability).to.be.equal(40)
    hotel.findAvailableRooms('2022/09/05')
    hotel.findAvailableRooms()
    expect(hotel.availability).to.be.equal(60)
  })
  it.skip('should be able to approve of any booking', () => {
    generateHotel()
    hotel.selectDate('2043/01/01')
    hotel.findAvailableRooms()
    expect(hotel.availability).to.be.equal(40)
    expect(hotel.pendingBookings).to.be.deep.equal([])
    hotel.pendingBookings.push(booking1)
    expect(hotel.pendingBookings).to.be.deep.equal([booking1])
    hotel.approveBooking(booking1.id)
    expect(hotel.availability).to.be.equal(20)
    expect(hotel.bookings).to.be.lengthOf(4)
    expect(hotel.pendingBookings).to.be.deep.equal([])
  })
  it.skip('should be able to deny any booking', () => {
    generateHotel()
    hotel.selectDate('2043/01/01')
    hotel.findAvailableRooms()
    expect(hotel.availability).to.be.equal(40)
    expect(hotel.pendingBookings).to.be.deep.equal([])
    hotel.pendingBookings.push(booking1)
    expect(hotel.pendingBookings).to.be.deep.equal([booking1])
    hotel.approveBooking(booking1.id)
    expect(hotel.availability).to.be.equal(40)
    expect(hotel.bookings).to.be.lengthOf(3)
    expect(hotel.pendingBookings).to.be.deep.equal([])
  })

  it.skip('should be able to show all rooms again', () => {
    generateHotel()
    hotel.selectDate(['2099/10/31'])
    hotel.findAvailableRooms()
    hotel.filterRooms('single room')
    expect(hotel.availableRooms).to.be.deep.equal(singleRooms)
    hotel.filterRooms('show all')
    expect(hotel.availableRooms).to.be.equal(hotelRooms)
  })
});

