const mongoose = require('mongoose')

const patientSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'first name is required'],
  },
  lastName: {
    type: String,
    required: [true, 'last name is required'],
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
  weight: {
    type: Number,
    required: [true, 'weight is required'],
  },
  height: {
    type: Number,
    required: [true, 'height is required'],
  },
  age: {
    type: Number,
    required: [true, 'age is required'],
  },
  condition: [
    {
      type: String,
      required: [true, 'Patient condition is required'],
    },
  ],
  medication: [
    {
      type: String,
      required: [true, 'Patient medication is required'],
    },
  ],
  allergies: [
    {
      type: String,
      required: [true, 'Allergies is required'],
    },
  ],
  createdAt: {
    type: Date,
    default: new Date(),
  },
  dateDiagnosed: [
    {
      type: String,
    },
  ],
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
})

const Patient = mongoose.model('Patient', patientSchema)

module.exports = Patient
