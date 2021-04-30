const Joi = require('joi')
const { ErrorHandler } = require('../utils/errorHandler')

const validateAppointment = async (data) => {
  const Schema = Joi.object({
    email: Joi.string().required(),
    firstName: Joi.string().required(),
    date: Joi.string().required(),
    time: Joi.string().required(),
  })
  const { error } = await Schema.validate(data)
  if (error) throw new ErrorHandler(error.statusCode, error.message)

  return null
}

module.exports = { validateAppointment }
