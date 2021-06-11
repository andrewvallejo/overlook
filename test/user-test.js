import { expect } from 'chai';
import User from '../src/components/classes/User'
import { userData } from './sample-data'

describe('User', () => {
  let guest1, guest2, guest3, guest4, guest5
  beforeEach(() => {
    guest1 = new User(userData[4])
    guest2 = new User(userData[0])
    guest3 = new User(userData[1])
    guest4 = new User(userData[2])
    guest5 = new User(userData[3])
  })
  it('should be an instance of User', function() {
    expect(guest1).to.be.an.instanceOf(User)
  })
})


