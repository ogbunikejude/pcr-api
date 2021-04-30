class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super()
    this.statusCode = statusCode
    this.message = message
  }
}

const handleError = (err, req, res, next) => {
  // console.log(err)
  res.status(err.statusCode || 500).json({
    message: err.message,
    status: 'error',
    data: null,
  })
}

const handleAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) =>
    next(new ErrorHandler(err.statusCode, err.message))
  )
}

module.exports = {
  ErrorHandler,
  handleError,
  handleAsync,
}
