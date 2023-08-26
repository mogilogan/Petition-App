const express = require('express')
const router = express.Router()
const { userLogin, newUserSignup } = require('../controllers/loginController')

router.post('/', userLogin)

router.post('/signup', newUserSignup)

module.exports = router