import mongoose from 'mongoose';
import uuid from 'uuid';

const { Schema } = mongoose;

const userSchema = new Schema({
  id: {
    type: String,
    default: uuid.v5,
  },
  firstName: {
    type: String,
    lowercase: true,
    required: true,
  },
  middleName: {
    type: String,
    lowercase: true,
  },
  lastName: {
    type: String,
    lowercase: true,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
  },
  gender: {
    type: String,
    lowercase: true,
  },
  avatarUrl: {
    type: String,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model('User', userSchema);

export default User;
