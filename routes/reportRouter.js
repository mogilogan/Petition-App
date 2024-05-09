const express = require("express");
const router = express.Router();
const {
  addReport,
  fetchReport,
  getReport,
  closeReport,
  returnreport,
  acceptreport,
  duplicate,
} = require("../controllers/ReportController");

router.post("/add", addReport);
router.post("/fetch", fetchReport);
router.post("/get", getReport);
router.post("/close", closeReport);
router.post("/return", returnreport);
router.post("/accept", acceptreport);
router.post("/duplicate", duplicate);

module.exports = router;
