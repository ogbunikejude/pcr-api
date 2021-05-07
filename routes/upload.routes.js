const { Router } = require('express')
const { uploadImage } = require('../controllers/upload.controller')
// const { isLoggedIn } = require('../middlewares/auth')
const { upload } = require('../services/upload.services')

const router = Router()

router.post('/', upload.single('image'), uploadImage)

module.exports = router
