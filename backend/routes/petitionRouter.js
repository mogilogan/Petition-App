const express = require('express')
const router = express.Router()
const { addPetition ,fetchallnew,fetchallongoing,fetchallonclosed,assigncp,assignsho,assignsp,assignssp, markview} = require('../controllers/petitionController')


router.post('/add', addPetition);
router.post('/fetchallnew', fetchallnew);
router.post('/fetchallongoing', fetchallongoing);
router.post('/fetchallclosed', fetchallonclosed);
router.post('/assignsho', assignsho);
router.post('/assignsp', assignsp);
router.post('/assignssp', assignssp);
router.post('/assigncp', assigncp);
// router.get('/forwarded',forwardfetch);
router.put('/markview',markview);



module.exports = router