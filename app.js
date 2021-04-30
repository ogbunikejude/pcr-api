const express = require('express')
const mongoose = require('mongoose')

require('dotenv').config()

//Routes
const userRouter = require('./routes/user.routes')
const uploadRouter = require('./routes/upload.routes')
const patientRouter = require('./routes/patient.routes')
const appointmentRouter = require('./routes/appointment.routes')
// Error handling middleware
const { handleError } = require('./utils/errorHandler')

const app = express()
const PORT = process.env.PORT || 8000
app.use(express.json())
app.use('/user', userRouter)
app.use('/patient', patientRouter)
app.use('/upload', uploadRouter)
app.use('/appointment', appointmentRouter)
app.use(handleError)

async function start() {
  await mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })

  app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
  })
}

start()
