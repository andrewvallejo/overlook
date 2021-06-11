import { expect } from 'chai';
import Room from '../src/components/classes/Room'
import { roomsData } from './sample-data'

describe.only('Room', () => {
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
})