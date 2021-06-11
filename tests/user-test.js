import { expect } from 'chai';
import User from '../src/components/classes/User'

describe('User class', function() {
  it('should be an instance of User', function() {
    const testUser = new User(User)
    expect(testUser).to.be.an.instanceOf(User)
  });
});

