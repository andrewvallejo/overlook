import { expect } from 'chai';
import { Room } from '../src/components/classes/Room'
import { roomsData } from './data/sample-data'

describe('Room', () => {
  let room1, room2, room3, room4, room5;
  beforeEach(() => {
    room1 = new Room(roomsData[0])
    room2 = new Room(roomsData[1])
    room3 = new Room(roomsData[2])
    room4 = new Room(roomsData[3])
    room5 = new Room(roomsData[4])
  })
  it('should be an instance of room', () => {
    expect(room1).to.be.an.instanceOf(Room)
  })
  it('should have a room number', () => {
    expect(room3.number).to.be.equal(3)
    expect(room5.number).to.be.equal(5)
  })
  it('should have all four room types', () => {
    expect(room1.roomType).to.be.equal('residential suite')
    expect(room2.roomType).to.be.equal('suite')
    expect(room3.roomType).to.be.equal('junior suite')
    expect(room5.roomType).to.be.equal('single room')
  })
  it('should say if it has a bidet or not', () => {
    expect(room1.bidet).to.be.true 
    expect(room2.bidet).to.be.false 
  })
  it('should have different bed sizes', () => {
    expect(room2.bedSize).to.be.equal('full')
    expect(room3.bedSize).to.be.equal('king')
    expect(room4.bedSize).to.be.equal('queen')
    expect(room5.bedSize).to.be.equal('twin')
  })
  it('should have one or two beds', () => {
    expect(room1.numBeds).to.be.equal(1)
    expect(room2.numBeds).to.be.equal(2)
  })
  it('should say how much the cost is per night', () => {
    expect(room1.costPerNight).to.be.equal(358.4)
    expect(room4.costPerNight).to.be.equal(429.44)
  })
})