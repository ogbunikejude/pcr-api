const router = require('express').Router()
const {
  addPatient,
  getPatients,
  getPatient,
  deletePatient,
  updatePatient,
  updatePatientCondition,
} = require('../controllers/patient.controller')
const { isLoggedIn } = require('../middlewares/auth')

router.use(isLoggedIn)

router.post('/', addPatient)
router.get('/', getPatients)
router.get('/:id', getPatient)
router.delete('/:id', deletePatient)
router.put('/:id', updatePatient)
router.patch('/:id', updatePatientCondition)

module.exports = router
