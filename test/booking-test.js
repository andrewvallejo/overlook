import { expect } from 'chai';
import Booking from '../src/components/classes/Booking';
import { bookingsData } from './sample-data';

describe.only('booking', () => {
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
});
