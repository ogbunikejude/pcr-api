const router = require('express').Router()
const {
  addAppointment,
  getAppointments,
  getAppointment,
  deleteAppointment,
  updateAppointment,
} = require('../controllers/appointment.controller')
const { isLoggedIn } = require('../middlewares/auth')

router.use(isLoggedIn)
router.post('/', addAppointment)
router.get('/', getAppointments)
router.get('/:id', getAppointment)
router.delete('/:id', deleteAppointment)
router.patch('/:id', updateAppointment)

module.exports = router
