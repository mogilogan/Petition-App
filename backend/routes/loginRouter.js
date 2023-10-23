const express = require('express')
const router = express.Router()
const { userLogin } = require('../controllers/loginController')

router.post('/', userLogin)


module.exports = router