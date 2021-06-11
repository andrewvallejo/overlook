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
  it('should be an instance of room', function() {
    expect(room1).to.be.an.instanceOf(Room)
  })
})