const express = require('express')
const router = express.Router()
const { addPetition } = require('../controllers/petitionController')

router.post('/add', addPetition)

module.exports = router