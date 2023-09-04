const express = require('express')
const router = express.Router()
const { userLogin } = require('../controllers/loginController')

router.post('/login', userLogin)


module.exports = router