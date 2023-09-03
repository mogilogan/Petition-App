const express = require('express')
const router = express.Router()
const { getComplain } = require('../controllers/peoplecontroller')


router.post('/', getComplain)

module.exports = router