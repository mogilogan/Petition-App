const express = require("express");
const router = express.Router();
const { getStatus } = require("../controllers/peoplecontroller");

router.post("/", getStatus);

module.exports = router;
