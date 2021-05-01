const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../model/user.model')
const { handleAsync, ErrorHandler } = require('../utils/errorHandler')
const {
  validateAddUser,
  validateUserLogin,
  validateUserUpdate,
} = require('../validations/user.validation')

const registerUser = handleAsync(async (req, res) => {
  const data = req.body
  await validateAddUser(data)
  // 1. check if user email exists
  let user = await User.findOne({ email: data.email })
  if (user) throw new ErrorHandler(400, 'Email already exists')
  // 2. Encrypt password
  data.password = await bcrypt.hash(data.password, 8)

  user = await User.create(data)
  res.status(201).json({
    status: 'Success',
    message: 'User created successfully',
    data: user,
  })
})

const loginUser = handleAsync(async (req, res) => {
  const data = req.body
  await validateUserLogin(data)

  // Check if email already exists
  const user = await User.findOne({ email: data.email.toLowerCase() })
  if (!user) throw new ErrorHandler(401, 'No user with this email found')

  // Check password
  const passwordCheck = await bcrypt.compare(data.password, user.password)
  if (!passwordCheck) throw new ErrorHandler(400, 'Incorrect password')

  // 3. generate a token
  const token = jwt.sign({ sub: user._id }, process.env.JWT_KEY, {
    expiresIn: '4h',
  })

  res.status(201).json({
    status: 'Success',
    message: 'User logged in successfully',
    data: {
      user,
      token,
    },
  })
})

const getProfile = handleAsync(async (req, res) => {
  res.status(201).json({
    status: 'Success',
    message: 'Profile fetched successfully',
    data: req.user,
  })
})

const updateUser = handleAsync(async (req, res) => {
  const { id } = req.params
  const data = req.body

  await validateUserUpdate(data)
  const user = await User.findByIdAndUpdate(id, data, { new: true })

  res.status(201).json({
    status: 'Success',
    message: 'Profile updated successfully',
    data: user,
  })
})

module.exports = {
  registerUser,
  loginUser,
  getProfile,
  updateUser,
}
