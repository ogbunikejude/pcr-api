const mongoose = require('mongoose')

const appointmentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
  },
  email: {
    type: String,
    required: [true, 'email address is required'],
    unique: true,
    lower: true,
  },
  date: {
    type: String,
    required: [true, 'Date is required'],
  },
  time: {
    type: String,
    required: [true, 'Time is required'],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
})

const Appointment = mongoose.model('Appointment', appointmentSchema)
module.exports = Appointment
