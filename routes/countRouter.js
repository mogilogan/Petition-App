const express = require('express')
const router = express.Router()
const { countongoing } = require('../controllers/dashboardController')


router.post('/count', countongoing)

module.exports = router