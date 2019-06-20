import mongoose from 'mongoose';
import uuid from 'uuid';
import { hashPassword, comparePassword } from '../helpers/password';

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

userSchema.pre('save', async function () {
  this.password = await hashPassword(this.password);
});

userSchema.statics.checkUniqueEmail = function (email) {
  return this.findOne({
    email,
  });
};

userSchema.methods.checkPasswordMatch = function (password) {
  return comparePassword(password, this.password);
};

userSchema.methods.getUserFullName = function () {
  const { firstName, lastName } = this;
  return [firstName, lastName].map(name => `${name.charAt(0).toUpperCase()}${name.substr(1)}`)
    .join(' ');
};

const User = mongoose.model('User', userSchema);

export default User;
