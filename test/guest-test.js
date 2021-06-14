import { expect } from 'chai';
import { Guest } from '../src/components/classes/Guest';
import {rooms, bookings, today} from './data/hotel-sample-data'
import { userData } from './data/sample-data'

describe.only('Guest', () => {
  let guest1
  beforeEach(() => {
    guest1 = new Guest(userData[0])
  })
  it('should be an instantation of a Guest', () => {
    expect(guest1).to.be.an.instanceOf(Guest)
  })
})
