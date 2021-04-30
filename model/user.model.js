const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
  },
  email: {
    type: String,
    required: [true, 'email address is required'],
    unique: true,
    lower: true,
  },
  phoneNumber: {
    type: Number,
    required: [true, 'Phone Number is required'],
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
  },
  profilePicture: {
    url: {
      type: String,
      required: [true, 'Doctor Profile picture url is required'],
    },
    id: {
      type: String,
      required: [true, 'Doctor Profile picture id is required'],
    },
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
})

const User = mongoose.model('User', userSchema)
module.exports = User
