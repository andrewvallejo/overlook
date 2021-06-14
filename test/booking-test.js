import { expect } from 'chai';
import { Booking } from '../src/components/classes/Booking';
import { bookingsData } from './data/sample-data';

describe('Booking', () => {
  let booking1, booking2, booking3, booking4, booking5;
  beforeEach(() => {
    booking1 = new Booking(bookingsData[0]);
    booking2 = new Booking(bookingsData[1]);
    booking3 = new Booking(bookingsData[2]);
    booking4 = new Booking(bookingsData[3]);
    booking5 = new Booking(bookingsData[4]);
  });
  it('should be an instance of booking', () => {
    expect(booking1).to.be.an.instanceOf(Booking)
  });
  it('should have an id', () => {
    expect(booking1.id).to.be.equal('5fwrgu4i7k55hl6sz')
    expect(booking3.id).to.be.equal('5fwrgu4i7k55hl6t6')
  })
  it('should have an id with the 17 characters', () => {
    expect(booking2.id).to.be.lengthOf(17)
    expect(booking4.id).to.be.lengthOf(17)
  })
  it('should have the user ID of has booked the room', () => {
    expect(booking1.userID).to.be.equal(9)
    expect(booking5.userID).to.be.equal(1)
  })
  it('should have the date with in the order of 2000/12/31', () => {
    expect(booking2.date).to.be.equal('2043/01/01')
    expect(booking5.date).to.be.equal('2022/09/05')
  })
  it('should have a room number', () => {
    expect(booking3.roomNumber).to.be.equal(3)
    expect(booking4.roomNumber).to.be.equal(4)
  })
  it('should have an empty array as a default for room service charges',
    () => {
      expect(booking1.roomServiceCharges).to.be.deep.equal([])
      expect(booking5.roomServiceCharges).to.be.deep.equal([])
    }) 
});
