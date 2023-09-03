const express = require('express')
const router = express.Router()
const { userLogin, newUserSignup } = require('../controllers/loginController')

router.post('/login', userLogin)
router.post('/signup', newUserSignup)

module.exports = router