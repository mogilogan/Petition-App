const express = require("express");
const router = express.Router();
const {
  addReport,
  fetchReport,
  getReport,
  closeReport,
} = require("../controllers/ReportController");

router.post("/add", addReport);
router.post("/fetch", fetchReport);
router.post("/get", getReport);
router.post("/close", closeReport);

module.exports = router;
