import { expect } from 'chai';
import User from '../src/components/classes/User'
import { userData } from './sample-data'

describe('User', () => {
  let guest1, guest2, guest3, guest4, guest5;
  beforeEach(() => {
    guest1 = new User(userData[0])
    guest2 = new User(userData[1])
    guest3 = new User(userData[2])
    guest4 = new User(userData[3])
    guest5 = new User(userData[4])
  })
  it('should be an instance of User', function() {
    expect(guest1).to.be.an.instanceOf(User)
  })
  it('should have an id', () => {
    expect(guest1.id).to.be.equal(1)
    expect(guest3.id).to.be.equal(3)
    expect(guest5.id).to.be.equal(5)
  })
  it('should have an id that is not a string', () => {
    expect(guest4.id).to.not.be.a('string');
    expect(guest3).to.be.a('number')
  })
})



