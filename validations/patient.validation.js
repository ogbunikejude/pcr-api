const Joi = require('joi')
const { ErrorHandler } = require('../utils/errorHandler')

const validateAddPatient = async (data) => {
  const Schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net'] },
      })
      .required(),
    phoneNumber: Joi.number().min(11).required(),
    weight: Joi.number().required(),
    height: Joi.number().required(),
    age: Joi.number().required(),
    condition: Joi.string().required(),
    medication: Joi.string().required(),
    allergies: Joi.string().required(),
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

const validatePatientUpdate = async (data) => {
  const Schema = Joi.object({
    firstName: Joi.string(),
    lastName: Joi.string(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    }),
    phoneNumber: Joi.number().min(11),
    weight: Joi.number(),
    height: Joi.number(),
    age: Joi.number(),
    condition: Joi.string(),
    medication: Joi.string(),
    allergies: Joi.string(),
    address: Joi.string(),
    profilePicture: Joi.object({
      id: Joi.string(),
      url: Joi.string(),
    }),
  })

  const { error } = await Schema.validate(data)
  if (error) throw new ErrorHandler(error.statusCode, error.message)

  return null
}

module.exports = {
  validateAddPatient,
  validatePatientUpdate,
}
