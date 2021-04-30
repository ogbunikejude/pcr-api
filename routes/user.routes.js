const router = require('express').Router()
const {
  registerUser,
  loginUser,
  getProfile,
  updateUser,
} = require('../controllers/user.controller')
const { isLoggedIn } = require('../middlewares/auth')

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/me', isLoggedIn, getProfile)
router.patch('/:id', isLoggedIn, updateUser)

module.exports = router
