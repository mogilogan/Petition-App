const express = require('express')
const router = express.Router()
const { addPetition ,fetchallnew,fetchallongoing,fetchallonclosed} = require('../controllers/petitionController')


router.post('/add', addPetition);
router.post('/fetchallnew', fetchallnew);
router.post('/fetchallongoing', fetchallongoing);
router.post('/fetchallonclosed', fetchallonclosed);



module.exports = router