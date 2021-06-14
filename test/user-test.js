import { expect } from 'chai';
import { User } from '../src/components/classes/User'
import { userData } from './data/sample-data'

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
    expect(guest3.id).to.be.a('number')
  })
  it('should have a name', () => {
    expect(guest2.name).to.be.equal('Rocio Schuster')
    expect(guest5.name).to.be.equal('Rhiannon Little')
  })
  it('should have a first and last name', () => {
    guest1 = guest1.name.split(' ')
    guest4 = guest4.name.split(' ')
    expect(guest1).to.be.deep.equal([ 'Leatha', 'Ullrich' ])
    expect(guest4).to.be.deep.equal([ 'Kennedi', 'Emard' ])
  })
  it('should have a username made from the lastname(lowercase) and id', () => {
    expect(guest1.username).to.be.equal('ullrich1')
    expect(guest4.username).to.be.equal('emard4')
  })
  it('should a default password of overlook2021', () => {
    expect(guest2.password).to.be.equal('overlook2021')
    expect(guest5.password).to.be.equal('overlook2021')
  })
})