/* eslint-disable prefer-destructuring */
const Patient = require('../model/patient.model')
const { handleAsync, ErrorHandler } = require('../utils/errorHandler')
const {
  validateAddPatient,
  validatePatientUpdate,
} = require('../validations/patient.validation')

const addPatient = handleAsync(async (req, res) => {
  const data = req.body
  await validateAddPatient(data)

  let patient = await Patient.findOne({ email: data.email })
  if (patient) throw new ErrorHandler(400, 'user with this email already exist')

  patient = await Patient.create({
    ...data,
    user: req.user._id,
  })

  res.status(201).json({
    status: 'success',
    message: 'Patient added successfully',
    data: patient,
  })
})

const getPatients = handleAsync(async (req, res) => {
  const patients = await Patient.find({ user: req.user._id }).populate([
    { path: 'user' },
  ])

  res.json({
    status: 'success',
    message: 'Patients fetched successfully',
    data: patients,
  })
})
const getPatient = handleAsync(async (req, res) => {
  const { id } = req.params
  const patient = await Patient.findOne({
    _id: id,
    user: req.user._id,
  }).populate([{ path: 'user' }])

  res.json({
    status: 'success',
    message: 'Patient fetched successfully',
    data: patient,
  })
})

const updatePatient = handleAsync(async (req, res) => {
  const { id } = req.params
  const data = req.body
  //   const date = new Date().toLocaleDateString()
  //   const conditions = data.conditions
  //   const allergy = data.allergy
  //   const medications = data.medications
  //   const patientConditions = {
  //     conditions,
  //     allergy,
  //     medications,
  //   }
  await validatePatientUpdate(data)
  const patient = await Patient.findByIdAndUpdate(id, data, {
    new: true,
  })

  res.json({
    status: 'success',
    message: 'Patient updated successfully',
    data: {
      patient,
    },
  })
})
const updatePatientCondition = handleAsync(async (req, res) => {
  const { id } = req.params
  const data = req.body

  // eslint-disable-next-line prefer-destructuring
  const condition = data.condition
  const medication = data.medication
  const allergies = data.allergies
  const dateDiagnosed = data.dateDiagnosed
  const patientCondition = {
    condition,
    medication,
    allergies,
    dateDiagnosed,
  }
  if (!patientCondition)
    throw new ErrorHandler(400, 'No patient condition found')

  const patient = await Patient.findById(id)
  patient.condition.push(condition)
  patient.medication.push(medication)
  patient.allergies.push(allergies)
  patient.dateDiagnosed.push(dateDiagnosed)
  await patient.save()

  res.json({
    status: 'success',
    message: 'Patient updated successfully',
    data: patient,
  })
})

const deletePatient = handleAsync(async (req, res) => {
  const { id } = req.params
  await Patient.findByIdAndDelete(id)

  res.json({
    status: 'success',
    message: 'Patient deleted successfully',
    data: null,
  })
})

module.exports = {
  addPatient,
  getPatients,
  getPatient,
  deletePatient,
  updatePatient,
  updatePatientCondition,
}
