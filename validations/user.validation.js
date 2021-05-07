const Joi = require('joi')
const { ErrorHandler } = require('../utils/errorHandler')

const validateAddUser = async (data) => {
  const Schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    password: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
      .required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net'] },
      })
      .required(),
    phoneNumber: Joi.string().min(11).required(),
    address: Joi.string().required(),
    profilePicture: Joi.object({
      id: Joi.string().required(),
      url: Joi.string().required(),
    }).required(),
  })
  const { error } = await Schema.validate(data)
  if (error) throw new ErrorHandler(error.statusCode, error.message)

  return null
}

const validateUserLogin = async (data) => {
  const Schema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().required(),
  })
  const { error } = await Schema.validate(data)
  if (error) throw new ErrorHandler(error.statusCode, error.message)

  return null
}

const validateUserUpdate = async (data) => {
  const Schema = Joi.object({
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    phoneNumber: Joi.number(),
    address: Joi.string(),
    profilePicture: Joi.object({
      id: Joi.string().required(),
      url: Joi.string().required(),
    }),
  })
  const { error } = await Schema.validate(data)
  if (error) throw new ErrorHandler(error.statusCode, error.message)

  return null
}

module.exports = {
  validateAddUser,
  validateUserLogin,
  validateUserUpdate,
}
