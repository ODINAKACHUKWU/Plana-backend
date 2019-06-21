import { assert } from 'chai';
import userData from '../fixtures/userData';
import User from '../../../models/user';

describe('User collection model', () => {
  it('should create an instance of a User model', () => {
    const user = new User();
    assert.instanceOf(user, User, 'user is an instance of User model');
  });

  it('should create an instance of a User model with valid credentials', async () => {
    const user = await User.create(userData);
    assert.instanceOf(user, User, 'user has all the provided credentials');
  });
});
