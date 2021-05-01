const Appointment = require('../model/appointment.model')
const sendEmail = require('../services/email.services')
const createPatientAppointmentTemplate = require('../templates/patientAppointment')
const { handleAsync } = require('../utils/errorHandler')
const { validateAppointment } = require('../validations/appointment.validation')

const addAppointment = handleAsync(async (req, res) => {
  const data = req.body

  await validateAppointment(data)

  // Send email appointment
  await sendEmail(
    data.email,
    'Hospital Appointment',
    createPatientAppointmentTemplate(data.firstName, data.date, data.time)
  )

  const appointment = await Appointment.create(data)

  res.status(200).json({
    status: 'success',
    message: 'Patient appointments successfully added',
    data: appointment,
  })
})
const getAppointments = handleAsync(async (req, res) => {
  const { page = 1, limit = 10 } = req.query
  const appointment = await Appointment.find()
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .exec()

  res.status(200).json({
    status: 'success',
    message: 'Patient appointments successfully displayed',
    data: appointment,
  })
})

const getAppointment = handleAsync(async (req, res) => {
  const { id } = req.params
  const appointment = await Appointment.findById(id)

  res.status(200).json({
    status: 'success',
    message: 'Patient appointment successfully displayed',
    data: appointment,
  })
})

const deleteAppointment = handleAsync(async (req, res) => {
  const { id } = req.params
  await Appointment.findByIdAndDelete(id)

  res.status(200).json({
    status: 'success',
    message: 'Patient appointment successfully deleted',
    data: null,
  })
})

const updateAppointment = handleAsync(async (req, res) => {
  const { id } = req.params
  const data = req.body
  const appointment = await Appointment.findByIdAndUpdate(id, data, {
    new: true,
  })

  res.status(200).json({
    status: 'success',
    message: 'Patient appointment successfully updated',
    data: appointment,
  })
})

module.exports = {
  updateAppointment,
  addAppointment,
  getAppointments,
  getAppointment,
  deleteAppointment,
}
